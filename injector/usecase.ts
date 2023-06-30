import { UserUsecase } from "../usecase/user";
import { Repository } from "./repository";

export class Usecase {
    User: UserUsecase;

    constructor(userUsecase: UserUsecase) {
        this.User = userUsecase;
    }

    static newUsecase(): Usecase {
        const repository = Repository.newRepository();

        const userUsecase = new UserUsecase(repository.User);

        return new Usecase(userUsecase);
    };
}