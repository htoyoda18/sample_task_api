import { User } from '@prisma/client';
import { Prisma } from '@prisma/client';

export interface UserRepositoryIF {
    GetUserbyEmail(email: string): Promise<Prisma.UserCreateInput | null>;
    CreateUser(user: User): Promise<Prisma.UserCreateInput>;
}