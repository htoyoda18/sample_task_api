import { User } from '@prisma/client';

export interface UserRepositoryIF {
    GetUserbyEmail(email: string): Promise<User | null>;
    CreateUser(user: User): Promise<User>;
}