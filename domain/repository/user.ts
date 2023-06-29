import { User } from '@prisma/client';

export interface UserRepositoryIF {
    GetUserbyEmail(email: string): void;
    CreateUser(user: User): void;
}