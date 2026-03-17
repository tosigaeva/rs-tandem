import { QueryClient } from '@tanstack/react-query';

export const QueryStorage = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 5 * 60 * 1000,
    },
  },
});
