import bcrypt from 'bcryptjs';
import { ErrorType } from './error';
import { logger } from './logger';

const saltRounds = 10;

export const hashPassword = async (password: string): Promise<string> => {
    try {
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        return hashedPassword;
    } catch (err) {
        logger.error(ErrorType.bcrypt.ErrorHashing, err);
        throw new Error(ErrorType.bcrypt.ErrorHashing);
    }
};

export const verifyPassword = async (hashedPassword: string, password: string): Promise<boolean> => {
    try {
        const correctPassword = await bcrypt.compare(hashedPassword, password);
        return correctPassword;
    } catch (err) {
        logger.error(ErrorType.bcrypt.ErrorVerifying, err);
        throw new Error(ErrorType.bcrypt.ErrorVerifying);
    }
};
