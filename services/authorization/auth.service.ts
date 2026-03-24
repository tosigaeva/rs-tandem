import Cookies from 'js-cookie';
import { toast } from 'sonner';

import { getUser, signIn, signOut, signUp } from '@/services/authorization/auth.client';
import { UserSignIn, UserSignUp } from '@/types/user';

import { useAuth } from './auth.store';

export const authService = {
  initialize: async () => {
    if (useAuth.getState().isAuthorized) return;

    try {
      if (getSupabaseAuthCookieName() != undefined) {
        const { data: userInfo } = await getUser();

        if (userInfo == undefined) {
          useAuth.getState().setUser(undefined, false);
        } else {
          useAuth.getState().setUser(userInfo, true);

          toast.success('Authorization successful');
          return true;
        }

        toast.info('Redirecting...');
        return false;
      }
    } catch {
      toast.error('Failed to authorize automatically, signing out...');
      await signOut();
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

    toast.info('Signed out successfully');

    if (!response || response.error != undefined) {
      removeSupabaseAuthCookie();
    }
  },
};

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
