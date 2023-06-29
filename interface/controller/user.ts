import { Request, Response } from 'express';
import { userCreateRequest, userCreateRequestData } from './request/user';
import { ErrorType } from '../../shared/error';
import { UserUsecase } from '../../usecase/user';

interface UserControllerIF {
    CreateUser(req: Request, res: Response): void;
}

export class UserController implements UserControllerIF {
    private userUsecase: UserUsecase;

    constructor(userUsecase: UserUsecase) {
        this.userUsecase = userUsecase;
    }

    CreateUser(req: Request, res: Response): void {
        const validationResult = userCreateRequest.validate(req.body);
        if (validationResult.error) {
            res.status(400).send(ErrorType.ValidationError);
            return;
        }

        const userCreateRequestData: userCreateRequestData = validationResult.value;
        this.userUsecase.CreateUser(userCreateRequestData);
        console.log(req.body);
    }
}