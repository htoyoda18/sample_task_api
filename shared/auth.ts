import jwt from "jsonwebtoken";
import { ErrorType } from "./error";
import { envConfig } from "./env";

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
        console.error("Error generating JWT token:", error);
        throw new Error(ErrorType.FailGeneratingJWT);
    }
}

export const parseToken = (token: string): string => {
    try {
        const decoded = jwt.verify(token, envConfig.JWT_KEY) as TokenPayload;

        if (decoded && decoded.userID) {
            return decoded.userID;
        } else {
            throw new Error(ErrorType.InvalidToken);
        }
    } catch (error) {
        console.error("Error parsing JWT token:", error);
        throw new Error(ErrorType.InvalidToken);
    }
}