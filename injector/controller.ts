import { UserController } from "../interface/controller/user";
import { Usecase } from "./usecase";

export class Controller {
    User: UserController;

    constructor(userController: UserController) {
        this.User = userController;
    }

    static newController(): Controller {
        const usecase = Usecase.newUsecase();

        const userController = new UserController(usecase.User);

        return new Controller(userController);
    }
}
