import jwt from "jsonwebtoken";
import { ErrorType } from "./error";
import { envConfig } from "./env";

interface TokenPayload {
    userID: string;
}

export const generateToken = (userID: string) => {
    const payload: TokenPayload = {
        userID: userID
    }
    const token = jwt.sign(payload, envConfig.JWT_KEY, { expiresIn: envConfig.JWT_TOKEN_EXPIRE, algorithm: 'RS256' });
    return token;
}

export const parseToken = (token: string) => {
    const decoded = jwt.verify(token, envConfig.JWT_KEY) as TokenPayload;
    if (decoded && decoded.userID) {
        return decoded.userID;
    } else {
        throw new Error(ErrorType.InvalidToken);
    }
}