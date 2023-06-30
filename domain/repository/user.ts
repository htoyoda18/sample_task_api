import { User } from '@prisma/client';

export interface UserRepositoryIF {
    getUserbyEmail(email: string): Promise<User | null>;
    createUser(user: User): Promise<User>;
}