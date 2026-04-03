import '@testing-library/jest-dom';
import 'jest-canvas-mock';

import { LanguageCode, Locale } from '@/services/locale/locale.service';

jest.mock('./providers/locale.provider', () => ({
  useLocale: () => ({
    locale: Locale.gb,
    languageCode: LanguageCode.en,
    setLocale: jest.fn(),
  }),
}));

jest.mock('./providers/auth-state.provider', () => ({
  useAuth: () => ({
    user: {
      id: 'test-user-uuid',
      email: 'test@example.com',
      username: 'testuser',
    },
    setUser: jest.fn(),
    isAuthorized: true,
    isAuthorizing: false,
    setAuthorizing: jest.fn(),
  }),
}));
