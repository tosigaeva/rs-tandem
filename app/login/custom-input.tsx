'use client';
import { Eye, EyeOff } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const DEBOUNCE_TIMER = 300;

export type InputProperties = {
  name: string;
  label: string;
  type: 'text' | 'password' | 'email' | 'number';
  placeholder?: string;
  classes?: string;
};

export const CustomInput = ({ name, label, type, placeholder, classes }: InputProperties) => {
  const {
    register,
    formState: { errors, touchedFields, dirtyFields },
    watch,
    trigger,
  } = useFormContext();

  const isPassword = type === 'password';
  const [visibility, visibilityToggle] = useState(false);

  const errorMessage = typeof errors[name]?.message === 'string' ? errors[name]?.message : '';

  const value = watch(name);
  const [debouncedValue, setDebouncedValue] = useState(value);

  const hasInteracted = Boolean(touchedFields[name]) || Boolean(dirtyFields[name]);
  const hasError = Boolean(errors[name]) && hasInteracted;

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, DEBOUNCE_TIMER);

    return () => {
      clearTimeout(timer);
    };
  });

  useEffect(() => {
    if (debouncedValue !== undefined && hasInteracted) {
      trigger(name);
    }
  }, [debouncedValue, name, trigger, hasInteracted]);

  return (
    <div className={cn('flex w-full flex-col gap-1.5', classes)}>
      <label className="text-sm font-medium text-slate-700" htmlFor={name}>
        {label}
      </label>
      <div className={cn('relative flex w-full align-middle')}>
        <input
          {...register(name)}
          id={name}
          type={visibility ? 'text' : type}
          placeholder={placeholder}
          className={cn(
            'w-full rounded-md border bg-amber-50 px-3 py-2 pr-10 text-sm transition-all outline-none',
            hasError ? 'border-red-500 bg-red-50' : 'border-slate-300 focus:border-blue-500'
          )}
        />
        {isPassword && (
          <Button
            variant="ghost"
            size="icon-xs"
            onClick={() => visibilityToggle(!visibility)}
            className="absolute top-1/2 right-1 -translate-y-1/2 text-slate-500 hover:text-slate-700"
            tabIndex={-1}
          >
            {visibility ? <Eye /> : <EyeOff />}
          </Button>
        )}
      </div>
      <div className="min-h-5">{hasError && <p className="text-xs font-medium text-red-500">{errorMessage}</p>}</div>
    </div>
  );
};
