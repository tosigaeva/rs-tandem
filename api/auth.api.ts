import { supabaseBrowser } from '@/lib/supabase/client';

export async function signIn({ email, password }: { email: string; password: string }) {
  if (!email || !password) {
    throw new Error('Email and password are required');
  }

  const supabase = await supabaseBrowser();

  try {
    return await supabase.auth.signInWithPassword({
      email,
      password,
    });
  } catch (error: unknown) {
    return { data: undefined, error: error instanceof Error ? error.message : 'An unexpected error occurred' };
  }
}

export async function signUp({ email, password, username }: { email: string; password: string; username: string }) {
  if (!email || !password || !username) {
    throw new Error('Email, password and username are required');
  }

  const supabase = await supabaseBrowser();
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
}

export async function signOut() {
  const supabase = await supabaseBrowser();

  try {
    return await supabase.auth.signOut();
  } catch (error: unknown) {
    return { data: undefined, error: error instanceof Error ? error.message : 'An unexpected error occurred' };
  }
}

export async function getUser() {
  const supabase = await supabaseBrowser();

  try {
    return await supabase.auth.getUser();
  } catch (error: unknown) {
    return { data: undefined, error: error instanceof Error ? error.message : 'An unexpected error occurred' };
  }
}
