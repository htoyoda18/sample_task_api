import { UserUsecase } from "../usecase/user";
import { Repository } from "./repository";

export class Usecase {
    User: UserUsecase;

    constructor(userUsecase: UserUsecase) {
        this.User = userUsecase;
    }

    static NewUsecase(): Usecase {
        const repository = Repository.NewRepository();

        const userUsecase = new UserUsecase(repository.User);

        return new Usecase(userUsecase);
    };
}