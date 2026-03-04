import { supabaseBrowser } from '@/lib/supabase/client';
import { User2 } from '@/types/user';

export async function signIn({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<{ data: User2 | undefined; error?: string }> {
  if (!email || !password) {
    throw new Error('Email and password are required');
  }

  const supabase = supabaseBrowser();

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
    return { data: undefined, error: error instanceof Error ? error.message : 'An unexpected error occurred' };
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
}): Promise<{ data: User2 | undefined; error?: string }> {
  if (!email || !password || !username) {
    throw new Error('Email, password and username are required');
  }

  const supabase = supabaseBrowser();
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
    return { data: undefined, error: error instanceof Error ? error.message : 'An unexpected error occurred' };
  }
}

export async function signOut() {
  const supabase = supabaseBrowser();

  try {
    return await supabase.auth.signOut();
  } catch (error: unknown) {
    return { data: undefined, error: error instanceof Error ? error.message : 'An unexpected error occurred' };
  }
}

export async function getUser(): Promise<{ data: User2 | undefined; error?: string }> {
  const supabase = supabaseBrowser();

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
    return { data: undefined, error: error instanceof Error ? error.message : 'An unexpected error occurred' };
  }
}
