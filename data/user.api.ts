import { mockUser } from '@/data/mocks/user.mock';
import { getUser as supaGetUser } from '@/data/supabase/user.supabase';
import { User } from '@/types/user';

export async function getUser(): Promise<User> {
  if (process.env.MOCK_MODE === 'true') {
    return mockUser;
  }

  return supaGetUser();
}
