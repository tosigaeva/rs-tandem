import Cookies from 'js-cookie';
import { toast } from 'sonner';
import { create } from 'zustand';

import { getUser, signIn, signOut, signUp } from '@/api/auth.api';
import { User2, UserLogin, UserRegister } from '@/types/user';

const USER_STORAGE_KEY = 'user';

type AuthStore = {
  user: User2 | undefined;
  isAuthorized: boolean;
  isAuthorizing: boolean;
  setUser: (user: User2 | undefined, isAuthorized?: boolean) => void;
  setAuthorizing: (isAuthorizing: boolean) => void;
};

const useAuth = create<AuthStore>((set) => ({
  user: undefined,
  isAuthorized: false,
  isAuthorizing: false,
  setUser: (user, isAuthorized) => set({ user, isAuthorized }),
  setAuthorizing: (isAuthorizing) => set({ isAuthorizing }),
}));

export const authService = {
  initialize: async () => {
    const user = retrieveCachedUserInfo();

    if (user != undefined || getSupabaseAuthCookieName() != undefined) {
      useAuth.getState().setAuthorizing(true);

      const { data: userInfo } = await getUser();

      if (userInfo != undefined) {
        useAuth.getState().setUser(userInfo, true);
        cacheUserInfo(userInfo);

        toast.success('Authorization successful');
        useAuth.getState().setAuthorizing(false);
      }
    }
  },

  login: async (data: UserLogin) => {
    useAuth.getState().setAuthorizing(true);

    const { data: user, error } = await signIn(data).finally(() => useAuth.getState().setAuthorizing(false));

    if (error != undefined) {
      toast.error(error);
    }

    if (user != undefined) {
      useAuth.getState().setUser(user, true);
      cacheUserInfo(user);

      toast.success('Login successful');
    }
  },

  register: async (data: UserRegister) => {
    useAuth.getState().setAuthorizing(true);

    const { data: user, error } = await signUp(data).finally(() => useAuth.getState().setAuthorizing(false));

    if (error != undefined) {
      toast.error(error);
    }

    if (user != undefined) {
      useAuth.getState().setUser(user, true);
      cacheUserInfo(user);

      toast.success('Register successful');
    }
  },

  logout: async () => {
    useAuth.getState().setAuthorizing(true);

    const response = await signOut().finally(() => useAuth.getState().setAuthorizing(false));

    useAuth.getState().setUser(undefined, false);
    cleanCachedUserInfo();

    toast.info('Logout successful');

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
