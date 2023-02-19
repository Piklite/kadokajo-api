import { User } from '@prisma/client';

export class UserEntity implements Omit<User, 'password'> {
  id: number;
  email: string;
  username: string;
  password?: string;
}
