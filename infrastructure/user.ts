import { UserRepositoryIF } from "../domain/repository/user";
import { PrismaClient, Prisma, User } from '@prisma/client';
import { ErrorType } from '../shared/error';
import { logger } from '..//shared/logger';

export class UserRepository implements UserRepositoryIF {
    private prisma = new PrismaClient()

    async GetUserbyEmail(email: string): Promise<User | null> {
        try {
            const user = await this.prisma.user.findFirst({ where: { email: email } })
            if (user == null) {
                logger.warn(ErrorType.User.ErrorNotFound);
                return null;
            }
            return user;
        } catch (error) {
            logger.error(ErrorType.User.ErrorFetching, error);
            throw new Error(ErrorType.User.ErrorFetching);
        }
    }

    async CreateUser(user: Prisma.UserCreateInput): Promise<User> {
        try {
            const newUser = await this.prisma.user.create({ data: user })
            return newUser
        } catch (error) {
            logger.error(ErrorType.User.ErrorCreating, error);
            throw new Error(ErrorType.User.ErrorCreating);
        }
    }
}