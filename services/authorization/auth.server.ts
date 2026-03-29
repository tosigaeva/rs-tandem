import { AuthError, PostgrestError } from '@supabase/supabase-js';
import { cookies } from 'next/headers';

import { supabaseServer } from '@/lib/supabase/server';
import { UserDetails } from '@/types/user';

import { AppMessages } from '../locale/messages';

export async function signIn({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<{ data: UserDetails | undefined; error?: string }> {
  if (!email || !password) {
    throw new Error('Email and password are required');
  }

  const supabase = await supabaseServer();

  try {
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) {
      throw authError;
    }

    if (!user || user.email == undefined) {
      throw new Error('User not found');
    }

    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('username')
      .eq('id', user.id)
      .single<{ username: string }>();

    if (profileError) {
      throw profileError;
    }

    return { data: { email: user.email, id: user.id, username: profile.username } };
  } catch (error: unknown) {
    return { data: undefined, error: handleError(error) };
  }
}

export async function signUp({
  email,
  password,
  username,
}: {
  email: string;
  password: string;
  username: string;
}): Promise<{ data: UserDetails | undefined; error?: string }> {
  if (!email || !password || !username) {
    throw new Error('Email, password and username are required');
  }

  const supabase = await supabaseServer();
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          username,
        },
      },
    });

    if (error) {
      if (error?.message.includes('profiles_username_key') || error.code === '23505') {
        throw new Error('Username already exists');
      }

      throw new Error(error.message);
    }

    const user = data.user;

    if (user && user.email != undefined) {
      return { data: { email: user.email, id: user.id, username } };
    }

    throw new Error('Something went wrong');
  } catch (error: unknown) {
    return { data: undefined, error: handleError(error) };
  }
}

export async function signOut() {
  const supabase = await supabaseServer();

  try {
    const { error } = await supabase.auth.signOut();

    if (error != undefined) {
      throw new Error(error.message);
    }
  } catch (error: unknown) {
    return { data: undefined, error: handleError(error) };
  }
}

export async function getUser(): Promise<{ data: UserDetails | undefined; error?: string }> {
  const supabase = await supabaseServer();

  try {
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError) {
      throw authError;
    }

    if (!user || user.email == undefined) {
      throw new Error('User not found');
    }

    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('username')
      .eq('id', user.id)
      .single<{ username: string }>();

    if (profileError) {
      throw profileError;
    }

    return { data: { email: user.email, id: user.id, username: profile.username } };
  } catch (error: unknown) {
    return { data: undefined, error: handleError(error) };
  }
}

const handleError = (error: unknown): string => {
  if (error instanceof AuthError || error instanceof PostgrestError) {
    const code = error.code;

    if (code === '23505') {
      return 'error.auth.conflict';
    }

    if ('status' in error && typeof error.status === 'number') {
      switch (error.status) {
        case 400:
        case 403: {
          return 'error.auth.invalid';
        }
        case 401: {
          return 'error.auth.expired';
        }
        case 409: {
          return 'error.auth.conflict';
        }
        case 429: {
          return 'error.auth.rate_limit';
        }
        case 500:
        case 502:
        case 503: {
          return 'error.server.maintenance';
        }
        case 504:
        case 408: {
          return 'error.server.timeout';
        }
      }
    }
  } else if (typeof error === 'string' && error in AppMessages) {
    return error;
  }

  return 'error.global.unknown';
};

export async function hasAuthCookie() {
  const cookieStore = await cookies();
  const allCookies = cookieStore.getAll();

  return allCookies.some((cookie) => cookie.name.startsWith('sb-') && cookie.name.endsWith('-auth-token'));
}
