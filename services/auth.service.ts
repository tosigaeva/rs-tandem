import Cookies from 'js-cookie';
import { toast } from 'sonner';
import { create } from 'zustand';

import { getUser, signIn, signOut, signUp } from '@/api/auth.api';
import { User2, UserSignIn, UserSignUp } from '@/types/user';

const USER_STORAGE_KEY = 'user';

type AuthStore = {
  user: User2 | undefined;
  isAuthorized: boolean;
  isAuthorizing: boolean;
  setUser: (user: User2 | undefined, isAuthorized?: boolean) => void;
  setAuthorizing: (isAuthorizing: boolean) => void;
};

export const useAuth = create<AuthStore>((set) => ({
  user: undefined,
  isAuthorized: false,
  isAuthorizing: false,
  setUser: (user, isAuthorized) => set({ user, isAuthorized }),
  setAuthorizing: (isAuthorizing) => set({ isAuthorizing }),
}));

export const authService = {
  initialize: async () => {
    if (useAuth.getState().isAuthorized) return;

    const user = retrieveCachedUserInfo();

    try {
      useAuth.getState().setAuthorizing(true);

      if (user != undefined || getSupabaseAuthCookieName() != undefined) {
        const { data: userInfo } = await getUser();

        if (userInfo == undefined) {
          useAuth.getState().setUser(undefined, false);
          cleanCachedUserInfo();
        } else {
          useAuth.getState().setUser(userInfo, true);
          cacheUserInfo(userInfo);

          toast.success('Authorization successful');
          return true;
        }

        toast.info('Redirecting...');
        return false;
      }
    } finally {
      useAuth.getState().setAuthorizing(false);
    }
  },

  signIn: async (data: UserSignIn): Promise<boolean> => {
    try {
      useAuth.getState().setAuthorizing(true);

      const { data: user, error } = await signIn(data);

      if (error != undefined) {
        toast.error(error);
      }

      if (user != undefined) {
        useAuth.getState().setUser(user, true);
        cacheUserInfo(user);

        toast.success('Signed in successfully');

        return true;
      }

      return false;
    } finally {
      useAuth.getState().setAuthorizing(false);
    }
  },

  signUp: async (data: UserSignUp): Promise<boolean> => {
    try {
      useAuth.getState().setAuthorizing(true);

      const { data: user, error } = await signUp(data);

      if (error != undefined) {
        toast.error(error);
      }

      if (user != undefined) {
        useAuth.getState().setUser(user, true);
        cacheUserInfo(user);

        toast.success('Signed up successfully');

        return true;
      }

      return false;
    } finally {
      useAuth.getState().setAuthorizing(false);
    }
  },

  signOut: async () => {
    useAuth.getState().setAuthorizing(true);

    const response = await signOut().finally(() => useAuth.getState().setAuthorizing(false));

    useAuth.getState().setUser(undefined, false);
    cleanCachedUserInfo();

    toast.info('Signed out successfully');

    if (!response || response.error != undefined) {
      removeSupabaseAuthCookie();
    }
  },
};

function cacheUserInfo(user: User2) {
  localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
}

function retrieveCachedUserInfo(): User2 | undefined {
  try {
    const data = localStorage.getItem(USER_STORAGE_KEY);

    if (data != undefined) {
      const user = JSON.parse(data);

      if (user != undefined && typeof user === 'object' && 'id' in user && 'email' in user && 'username' in user) {
        useAuth.getState().setUser(user);

        return user;
      }
    }
  } catch {
    cleanCachedUserInfo();
    useAuth.getState().setUser(undefined, false);
  }
}

function cleanCachedUserInfo() {
  localStorage.removeItem(USER_STORAGE_KEY);
}

function getSupabaseAuthCookieName(): string | undefined {
  const allCookies = Cookies.get();
  return Object.keys(allCookies).find((key) => key.startsWith('sb-') && key.endsWith('-auth-token'));
}

function removeSupabaseAuthCookie() {
  const name = getSupabaseAuthCookieName();

  if (name != undefined) {
    Cookies.remove(name, { path: '/' });
  }
}
