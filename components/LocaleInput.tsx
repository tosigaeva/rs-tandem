import { useFormContext } from 'react-hook-form';

import { cn } from '@/lib/utils';
import { LanguageCode } from '@/services/locale/locale.service';
import { LocaleString } from '@/types/schemas/locale-schemas';

import { CustomInput } from './CustomInput';

type LocaleInputProperties = {
  name: string;
  label: string;
  defaultValue?: LocaleString;
};

export const LocaleInput = ({ name, label }: LocaleInputProperties) => {
  const { formState, getFieldState } = useFormContext();
  const { error } = getFieldState(name, formState);

  return (
    <div
      className={cn(
        'col-span-full space-y-2 border-l-2 pl-4 duration-200',
        error ? 'border-red-500' : 'border-cyan-600'
      )}
    >
      <span className="text-muted-foreground text-sm font-medium">{label}</span>
      <div className="flex flex-col">
        {Object.values(LanguageCode).map((lang) => (
          <CustomInput
            key={lang}
            name={`${name}.${lang}`}
            label={lang.toUpperCase()}
            placeholder={`Enter ${label.toLowerCase()} in ${lang}...`}
            type={'text'}
          />
        ))}
      </div>
    </div>
  );
};
