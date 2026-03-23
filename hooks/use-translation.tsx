import { LanguageCode, useLocale } from '@/services/locale/locale.service';
import { AppMessages, MessageKey } from '@/services/locale/messages';
import { LocaleString } from '@/types/schemas/locale-schemas';

export function useTranslation() {
  const { languageCode } = useLocale();

  const t = (key: MessageKey): string => {
    const message = AppMessages[key];

    return message[languageCode];
  };

  const translate = (localRecord: LocaleString | undefined): string => {
    if (!localRecord) return '';

    return localRecord[languageCode] ?? localRecord[LanguageCode.en] ?? '';
  };

  return { t, translate };
}
