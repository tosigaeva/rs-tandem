import nextJest from 'next/jest';

const createJestConfig = nextJest({
  dir: './',
});

const config = {
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
  },
  transformIgnorePatterns: [
    'node_modules/(?!(react-syntax-highlighter|refractor|hastscript|property-information|hast-util-parse-selector|space-separated-tokens|comma-separated-tokens)/)',
  ],
};

export default createJestConfig(config);
