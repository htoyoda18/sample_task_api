import { UserRepository } from "../infrastructure/user";
import { userCreateRequestData } from '../interface/controller/request/user';
import { Prisma } from '@prisma/client';
import { generateUUID } from '../shared/uuid';
import { ErrorType } from '../shared/error';
import { logger } from '..//shared/logger';

interface UserUsecaseIF {
    CreateUser(userCreateRequestData: userCreateRequestData): void;
}

export class UserUsecase implements UserUsecaseIF {
    private userRepository: UserRepository;

    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository;
    }

    async CreateUser(userCreateRequestData: userCreateRequestData): Promise<void> {
        const existingUser = await this.userRepository.GetUserbyEmail(userCreateRequestData.email);

        if (existingUser) {
            logger.warn(ErrorType.User.AlredyExists);
            throw new Error(ErrorType.User.AlredyExists);
        }
        try {
            const userData: Prisma.UserCreateInput = {
                id: generateUUID(),
                name: userCreateRequestData.name,
                email: userCreateRequestData.email,
                pass: userCreateRequestData.pass,
            }

            await this.userRepository.CreateUser(userData);
        } catch (error) {
            logger.warn(ErrorType.User.ErrorCreating, error);
            throw new Error(ErrorType.User.ErrorCreating);
        }
    }
}