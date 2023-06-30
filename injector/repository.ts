import { UserRepository } from "../infrastructure/user";

export class Repository {
    User: UserRepository;

    constructor(userRepository: UserRepository) {
        this.User = userRepository;
    }

    static newRepository(): Repository {
        const userRepository = new UserRepository();

        return new Repository(userRepository);
    }
}