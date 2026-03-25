import { LanguageCode } from '@/services/locale/locale.service';
import { LocaleString } from '@/types/schemas/locale-schemas';

import { CustomInput } from './CustomInput';

type LocaleInputProperties = {
  name: string;
  label: string;
  defaultValue?: LocaleString;
};

export const LocaleInput = ({ name, label, defaultValue }: LocaleInputProperties) => {
  return (
    <div className="col-span-full space-y-2 border-l-2 border-b-cyan-600 pl-4">
      <span className="text-muted-foreground text-sm font-medium">{label}</span>
      <div className="flex flex-col">
        {Object.values(LanguageCode).map((lang) => (
          <CustomInput
            key={lang}
            name={`${name}.${lang}`}
            label={lang.toUpperCase()}
            placeholder={`Enter ${label.toLowerCase()} in ${lang}...`}
            type={'text'}
            defaultValue={defaultValue?.[lang]}
          />
        ))}
      </div>
    </div>
  );
};
