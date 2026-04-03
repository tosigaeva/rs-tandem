import '@testing-library/jest-dom';
import 'jest-canvas-mock';

import { LanguageCode, Locale } from '@/services/locale/locale.service';

jest.mock('@/providers/locale.provider', () => ({
  useLocale: () => ({
    locale: Locale.gb,
    languageCode: LanguageCode.en,
    setLocale: jest.fn(),
  }),
}));
