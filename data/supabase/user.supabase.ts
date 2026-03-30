import { supabaseServer } from '@/lib/supabase/server';
import { User } from '@/types/user';

export async function getUser(): Promise<User> {
  const supabase = await supabaseServer();
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError != undefined || user == undefined) {
    return {
      id: '',
      name: 'User',
    };
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('username')
    .eq('id', user.id)
    .single<{ username: string }>();

  return {
    id: user.id,
    name: profile?.username ?? user.user_metadata.username ?? user.email?.split('@')[0] ?? 'User',
  };
}
