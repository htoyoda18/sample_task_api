import { UserRepository } from "../infrastructure/user";
import { userCreateRequestData } from '../interface/controller/request/user';
import { Prisma, User } from '@prisma/client';
import { generateUUID } from '../shared/uuid';
import { ErrorType } from '../shared/error';
import { logger } from '..//shared/logger';
import { hashPassword } from '../shared/bcrypt';

interface UserUsecaseIF {
    createUser(userCreateRequestData: userCreateRequestData): void;
}

export class UserUsecase implements UserUsecaseIF {
    private userRepository: UserRepository;

    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository;
    }

    async createUser(userCreateRequestData: userCreateRequestData): Promise<User | null> {
        const existUser = await this.userRepository.getUserbyEmail(userCreateRequestData.email);

        if (existUser) {
            logger.warn(ErrorType.User.AlredyExists);
            throw new Error(ErrorType.User.AlredyExists);
        }
        try {
            const hashPass = await hashPassword(userCreateRequestData.pass)
            const userData: Prisma.UserCreateInput = {
                id: generateUUID(),
                name: userCreateRequestData.name,
                email: userCreateRequestData.email,
                pass: hashPass,
            }

            const newUser = await this.userRepository.createUser(userData);
            return newUser;
        } catch (error) {
            logger.warn(ErrorType.User.ErrorCreating, error);
            throw new Error(ErrorType.User.ErrorCreating);
        }
    }
}