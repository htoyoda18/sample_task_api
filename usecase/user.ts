import { UserRepository } from "../infrastructure/user";
import { userCreateRequestData } from '../interface/controller/request/user';
import { Prisma } from '@prisma/client';
import { generateUUID } from '../shared/uuid';

interface UserUsecaseIF {
    CreateUser(userCreateRequestData: userCreateRequestData): void;
}

export class UserUsecase implements UserUsecaseIF {
    private userRepository: UserRepository;

    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository;
    }

    async CreateUser(userCreateRequestData: userCreateRequestData): Promise<void> {
        try {
            const existingUser = await this.userRepository.GetUserbyEmail(userCreateRequestData.email);

            if (existingUser) {
                throw new Error('User already exists');
            }

            const userData: Prisma.UserCreateInput = {
                id: generateUUID(),
                name: userCreateRequestData.name,
                email: userCreateRequestData.email,
                pass: userCreateRequestData.pass,
            }

            this.userRepository.CreateUser(userData);
        } catch (error) {
            console.error("Error occurred while creating user: ", error);
            throw new Error('Error creating user');
        }
    }
}