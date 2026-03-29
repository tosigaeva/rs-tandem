import { create } from 'zustand';

import { UserDetails } from '@/types/user';

type AuthStore = {
  user: UserDetails | undefined;
  initialAuthorization: boolean;
  isAuthorized: boolean;
  isAuthorizing: boolean;
  setUser: (user: UserDetails | undefined, isAuthorized?: boolean) => void;
  confirmInitialAuthorization: () => void;
  setAuthorizing: (isAuthorizing: boolean) => void;
};

export const useAuth = create<AuthStore>((set) => ({
  user: undefined,
  initialAuthorization: false,
  isAuthorized: false,
  isAuthorizing: false,
  setUser: (user, isAuthorized) => set({ user, isAuthorized }),
  confirmInitialAuthorization: () => set({ initialAuthorization: true }),
  setAuthorizing: (isAuthorizing) => set({ isAuthorizing }),
}));
