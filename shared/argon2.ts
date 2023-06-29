import argon2 from 'argon2';
import { ErrorType } from '../shared/error';
import { logger } from '..//shared/logger';

export const hashPassword = async (password: string): Promise<string> => {
    try {
        const hashedPassword = await argon2.hash(password);
        return hashedPassword;
    } catch (err) {
        logger.error(ErrorType.Argon2.ErrorHashing, err);
        throw new Error(ErrorType.Argon2.ErrorHashing);
    }
};

export const verifyPassword = async (hashedPassword: string, password: string): Promise<boolean> => {
    try {
        const correctPassword = await argon2.verify(hashedPassword, password);
        return correctPassword;
    } catch (err) {
        logger.error(ErrorType.Argon2.ErrorVerifying, err);
        throw new Error(ErrorType.Argon2.ErrorVerifying);
    }
};
