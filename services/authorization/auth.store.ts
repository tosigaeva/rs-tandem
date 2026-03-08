import { create } from 'zustand';

import { UserDetails } from '@/types/user';

type AuthStore = {
  user: UserDetails | undefined;
  isAuthorized: boolean;
  isAuthorizing: boolean;
  setUser: (user: UserDetails | undefined, isAuthorized?: boolean) => void;
  setAuthorizing: (isAuthorizing: boolean) => void;
};

export const useAuth = create<AuthStore>((set) => ({
  user: undefined,
  isAuthorized: false,
  isAuthorizing: false,
  setUser: (user, isAuthorized) => set({ user, isAuthorized }),
  setAuthorizing: (isAuthorizing) => set({ isAuthorizing }),
}));
