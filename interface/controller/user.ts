import { Request, Response } from 'express';
import { userCreateRequest, userCreateRequestData } from './request/user';
import { ErrorType } from '../../shared/error';
import { UserUsecase } from '../../usecase/user';
import { logger } from '../../shared/logger';
import { generateToken } from '../../shared/auth';

interface UserControllerIF {
    createUser(req: Request, res: Response): Promise<void>;
}

export class UserController implements UserControllerIF {
    private userUsecase: UserUsecase;

    constructor(userUsecase: UserUsecase) {
        this.userUsecase = userUsecase;
    }

    async createUser(req: Request, res: Response): Promise<void> {
        try {
            const validationResult = userCreateRequest.validate(req.body);
            if (validationResult.error) {
                logger.warn(validationResult.error);
                res.status(400).send(ErrorType.ValidationError);
                return;
            }

            const userCreateRequestData: userCreateRequestData = validationResult.value;
            const newUser = await this.userUsecase.createUser(userCreateRequestData);
            if (newUser) {
                const token = generateToken(newUser.id);
                res.status(200).send(token);
            }
        } catch (error: any) {
            logger.warn(error);
            if (error.message && error.message === ErrorType.User.AlredyExists) {
                res.status(400).send(ErrorType.User.AlredyExists);
                return;
            }
            res.status(500).send(error);
        }
    }
}