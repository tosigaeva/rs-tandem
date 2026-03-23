'use client';
import { Eye, EyeOff } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export const CUSTOM_INPUT_DEBOUNCE_TIMER = 300;

export type InputProperties = {
  name: string;
  label: string;
  type: 'text' | 'password' | 'email' | 'number';
  placeholder?: string;
  classes?: string;
  dependencies?: string[];
};

export const CustomInput = ({ name, label, type, placeholder, classes, dependencies }: InputProperties) => {
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

  const isEmpty = () => value == undefined || value == '';

  const hasInteracted = Boolean(touchedFields[name]) || Boolean(dirtyFields[name]);
  const hasError = Boolean(errors[name]) && hasInteracted;

  const [initialBlur, setInitialBlur] = useState(false);

  const { onChange: rhfOnChange, onBlur: rhfOnBlur, ...restRegister } = register(name);

  const debounceReference = useRef<NodeJS.Timeout | undefined>(undefined);

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    rhfOnChange(event);

    if (debounceReference.current) clearTimeout(debounceReference.current);

    debounceReference.current = setTimeout(() => {
      if (!initialBlur) {
        setInitialBlur(true);
      }

      trigger(name);
      dependencies?.forEach((dependency) => {
        if (dirtyFields[dependency] != undefined) trigger(dependency);
      });
    }, CUSTOM_INPUT_DEBOUNCE_TIMER);
  };

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    rhfOnBlur(event);

    setInitialBlur(true);
  };

  useEffect(() => {
    return () => {
      if (debounceReference.current) clearTimeout(debounceReference.current);
    };
  }, []);

  return (
    <div className={cn('flex w-full flex-col gap-1.5', classes)}>
      <label className="text-sm font-medium text-slate-700" htmlFor={name}>
        {label}
      </label>
      <div className={cn('relative flex w-full align-middle')}>
        <input
          {...restRegister}
          id={name}
          type={visibility ? 'text' : type}
          placeholder={placeholder}
          className={cn(
            'w-full rounded-md border bg-amber-50 px-3 py-2 pr-10 text-sm transition-all outline-none',
            hasError ? 'border-red-500 bg-red-50' : 'border-slate-300 focus:border-blue-500'
          )}
          onChange={handleOnChange}
          onBlur={handleBlur}
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
      <div className="min-h-5">
        {hasError && initialBlur && (
          <p className="text-xs font-medium text-red-500">{isEmpty() ? 'Field is required' : errorMessage}</p>
        )}
      </div>
    </div>
  );
};
