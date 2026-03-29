import { useFormContext } from 'react-hook-form';

import { useTranslation } from '@/hooks/use-translation';
import { cn } from '@/lib/utils';

export type SelectOption<T> = { value: T; label: string };

type SelectProperties<T> = {
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

export const CustomSelect = <T extends string | number>({
  name,
  label,
  options,
  classes,
  onChange,
  readonly,
}: SelectProperties<T>) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const { t } = useTranslation();

  const hasError = Boolean(errors[name]);

  const isNumberType = typeof options[0]?.value === 'number';

  const { onChange: rhfOnChange, ...rest } = register(name, {
    valueAsNumber: isNumberType,
  });

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    rhfOnChange(event);

    if (onChange == undefined) return;

    const { validator, act } = onChange;

    const validOption = validator(event.target.value);
    if (validOption == undefined) return;

    act(validOption);
  };

  return (
    <div
      className={cn('flex w-full flex-col gap-1.5', (readonly ?? false) && 'pointer-events-none', classes)}
      tabIndex={(readonly ?? false) ? -1 : 0}
    >
      <label className="text-sm font-medium text-slate-700">{label}</label>
      <select
        {...rest}
        className={cn(
          'w-full rounded-md border bg-slate-50 px-3 py-2 text-sm transition-all outline-none',
          hasError ? 'border-red-500' : 'border-slate-300 focus:border-blue-500'
        )}
        onChange={handleChange}
      >
        <option value="">Select {label}</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {hasError && <p className="text-xs text-red-500">{t('validation.selection_required')}</p>}
    </div>
  );
};
