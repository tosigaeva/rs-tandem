import { Controller, useFormContext } from 'react-hook-form';

import { cn } from '@/lib/utils';

export type SelectOption<T> = { value: T; label: string };

export type SelectProperties<T> = {
  name: string;
  label: string;
  options: SelectOption<T>[];
  classes?: string;
  onChange?: {
    validator: (value: string) => T | undefined;
    act: (value: T) => void;
  };
  defaultValue?: T;
  readonly?: boolean;
};

export const CustomSelect = <T extends string | number | boolean>({
  name,
  label,
  options,
  classes,
  onChange,
  readonly,
}: SelectProperties<T>) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  const hasError = Boolean(errors[name]);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange: rhfOnChange, value, ref, onBlur } }) => {
        const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
          const rawValue = event.target.value;

          if (onChange === undefined) {
            rhfOnChange(event);
            return;
          }

          const { validator, act } = onChange;
          const validOption = validator(rawValue);

          if (validOption !== undefined) {
            rhfOnChange(validOption);

            act(validOption);
          }
        };
        return (
          <div
            className={cn('flex w-full flex-col gap-1.5', (readonly ?? false) && 'pointer-events-none', classes)}
            tabIndex={(readonly ?? false) ? -1 : 0}
          >
            <label className="text-sm font-medium text-slate-700">{label}</label>
            <select
              ref={ref}
              value={value?.toString() ?? ''}
              onBlur={onBlur}
              onChange={handleChange}
              className={cn(
                'w-full rounded-md border bg-slate-50 px-3 py-2 text-sm transition-all outline-none',
                hasError ? 'border-red-500' : 'border-slate-300 focus:border-blue-500'
              )}
            >
              <option value="">Select {label}</option>
              {options.map((opt) => (
                <option key={opt.value.toString()} value={opt.value.toString()}>
                  {opt.label}
                </option>
              ))}
            </select>
            {hasError && <p className="text-xs text-red-500">Selection required</p>}
          </div>
        );
      }}
    />
  );
};
