import { UserRepositoryIF } from "../domain/repository/user";
import { PrismaClient, Prisma } from '@prisma/client';

export class UserRepository implements UserRepositoryIF {
    private prisma = new PrismaClient()

    async GetUserbyEmail(email: string) {
        try {
            const user = await this.prisma.user.findUnique({ where: { email: email } })
            return user;
        } catch (error) {
            console.error("Error occurred while fetching user by email: ", error);
            throw new Error('Error fetching user');
        }
    }

    async CreateUser(user: Prisma.UserCreateInput) {
        try {
            const newUser = await this.prisma.user.create({ data: user })
            return newUser
        } catch (error) {
            console.error("Error occurred while creating user: ", error);
            throw new Error('Error creating user');
        }
    }
}