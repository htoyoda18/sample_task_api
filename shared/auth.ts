import jwt from "jsonwebtoken";
import { ErrorType } from "./error";
import { envConfig } from "./env";
import { logger } from './logger';

interface TokenPayload {
    userID: string;
}

export const generateToken = (userID: string): string => {
    const payload: TokenPayload = {
        userID
    }

    try {
        const token = jwt.sign(payload, envConfig.JWT_KEY, { expiresIn: envConfig.JWT_TOKEN_EXPIRE, algorithm: 'HS256' });
        return token;
    } catch (error) {
        logger.error(ErrorType.JWT.FailGenerating, error);
        throw new Error(ErrorType.JWT.FailGenerating);
    }
}

export const parseToken = (token: string): string => {
    try {
        const decoded = jwt.verify(token, envConfig.JWT_KEY) as TokenPayload;

        if (decoded && decoded.userID) {
            return decoded.userID;
        } else {
            logger.error(ErrorType.JWT.InvalidToken);
            throw new Error(ErrorType.JWT.ParseError);
        }
    } catch (error) {
        logger.error(ErrorType.JWT.InvalidToken, error);
        throw new Error(ErrorType.JWT.InvalidToken);
    }
}