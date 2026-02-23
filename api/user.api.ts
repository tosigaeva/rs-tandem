import { User } from '@/types/user';

export async function getUser(): Promise<User> {
  return { id: '1', name: 'Ivan' };
}
