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
  readonly?: boolean;
  allowedPattern?: RegExp;
};

export const CustomInput = ({
  name,
  label,
  type,
  placeholder,
  classes,
  dependencies,
  readonly,
  allowedPattern,
}: InputProperties) => {
  const { register, formState, getFieldState, watch, trigger } = useFormContext();
  const isPassword = type === 'password';
  const [visibility, visibilityToggle] = useState(false);

  const { error, isTouched, isDirty } = getFieldState(name, formState);

  const errorMessage = error?.message ?? '';

  const value = watch(name);

  const isEmpty = () => value == undefined || value == '';

  const hasInteracted = isTouched || isDirty;
  const hasError = Boolean(error) && hasInteracted;

  const [initialBlur, setInitialBlur] = useState(false);

  const {
    onChange: rhfOnChange,
    onBlur: rhfOnBlur,
    ...restRegister
  } = register(name, { valueAsNumber: type === 'number' });

  const debounceReference = useRef<NodeJS.Timeout | undefined>(undefined);

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let rawValue = event.target.value;

    if (allowedPattern) {
      rawValue = rawValue.replace(allowedPattern, '');
      event.target.value = rawValue;
    }

    rhfOnChange(event);

    if (debounceReference.current) clearTimeout(debounceReference.current);

    debounceReference.current = setTimeout(() => {
      if (!initialBlur) {
        setInitialBlur(true);
      }

      trigger(name);
      dependencies?.forEach((dependency) => {
        if (isDirty) trigger(dependency);
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
    <div className={cn('flex w-full flex-col gap-1.5', (readonly ?? false) && 'pointer-events-none', classes)}>
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
            'w-full rounded-md border bg-slate-50 px-3 py-2 pr-10 text-sm transition-all outline-none',
            hasError ? 'border-red-500 bg-red-50' : 'border-slate-300 focus:border-blue-500'
          )}
          onChange={handleOnChange}
          onBlur={handleBlur}
          readOnly={readonly}
          tabIndex={(readonly ?? false) ? -1 : 0}
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
