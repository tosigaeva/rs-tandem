import { supabaseServer } from '@/lib/supabase/server';

export const authApi = {
  signIn: async (email: string, password: string) => {
    if (!email || !password) {
      throw new Error('Email and password are required');
    }

    const supabase = await supabaseServer();

    try {
      return await supabase.auth.signInWithPassword({
        email,
        password,
      });
    } catch (error: unknown) {
      return { data: undefined, error: error instanceof Error ? error.message : 'An unexpected error occurred' };
    }
  },

  signUp: async (email: string, password: string, username: string) => {
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
        throw new Error(error.message);
      }

      return data;
    } catch (error: unknown) {
      return { data: undefined, error: error instanceof Error ? error.message : 'An unexpected error occurred' };
    }
  },

  signOut: async () => {
    const supabase = await supabaseServer();

    try {
      return await supabase.auth.signOut();
    } catch (error: unknown) {
      return { data: undefined, error: error instanceof Error ? error.message : 'An unexpected error occurred' };
    }
  },

  getUSer: async () => {
    const supabase = await supabaseServer();

    try {
      return await supabase.auth.getUser();
    } catch (error: unknown) {
      return { data: undefined, error: error instanceof Error ? error.message : 'An unexpected error occurred' };
    }
  },
};
