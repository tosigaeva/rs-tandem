import { mockUser } from '@/api/user.mock';
import { User } from '@/types/user';

export async function getUser(): Promise<User> {
  return mockUser;
}
