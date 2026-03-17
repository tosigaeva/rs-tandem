import Cookies from 'js-cookie';
import { toast } from 'sonner';

import { getUser, signIn, signOut, signUp } from '@/services/authorization/auth.client';
import { CustomSchemas } from '@/types/schemas/schemas';
import { UserDetails, UserSignIn, UserSignUp } from '@/types/user';

import { useAuth } from './auth.store';

const USER_STORAGE_KEY = 'user';

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

function cacheUserInfo(user: UserDetails) {
  localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
}

function retrieveCachedUserInfo(): UserDetails | undefined {
  try {
    const data = localStorage.getItem(USER_STORAGE_KEY);

    if (data == undefined) return;

    const user = JSON.parse(data);

    const schema = CustomSchemas.UserSchema;

    const result = schema.safeParse(user).success;

    if (result) {
      useAuth.getState().setUser(user);

      return user;
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
