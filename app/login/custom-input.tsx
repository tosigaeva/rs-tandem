'use client';
import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

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
      <label className="text-sm font-medium text-slate-700">{label}</label>
      <input
        {...register(name)}
        type={type}
        placeholder={placeholder}
        className={cn(
          'relative rounded-md border bg-amber-50 px-3 py-2 text-sm transition-all outline-none',
          hasError ? 'border-red-500 bg-red-50' : 'border-slate-300 focus:border-blue-500'
        )}
      />
      <div className="min-h-5">{hasError && <p className="text-xs font-medium text-red-500">{errorMessage}</p>}</div>
    </div>
  );
};
