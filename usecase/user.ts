import { UserRepository } from "../infrastructure/user";
import { userCreateRequestData } from '../interface/controller/request/user';
import { Prisma } from '@prisma/client';
import { generateUUID } from '../shared/uuid';
import { ErrorType } from '../shared/error';
import { logger } from '..//shared/logger';
import { hashPassword } from '../shared/bcrypt';

interface UserUsecaseIF {
    CreateUser(userCreateRequestData: userCreateRequestData): void;
}

export class UserUsecase implements UserUsecaseIF {
    private userRepository: UserRepository;

    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository;
    }

    async CreateUser(userCreateRequestData: userCreateRequestData): Promise<Prisma.UserCreateInput | null> {
        const existUser = await this.userRepository.GetUserbyEmail(userCreateRequestData.email);

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

            const newUser = await this.userRepository.CreateUser(userData);
            return newUser;
        } catch (error) {
            logger.warn(ErrorType.User.ErrorCreating, error);
            throw new Error(ErrorType.User.ErrorCreating);
        }
    }
}