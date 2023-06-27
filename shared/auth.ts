import jwt from "jsonwebtoken";
import { ErrorType } from "./error";

interface TokenPayload {
    userID: string;
}

export const generateToken = (userID: string) => {
    const payload: TokenPayload = {
        userID: userID
    }
    const secret = process.env.JWT_KEY;
    if (!secret) {
        //エラーもまとめたい
        throw new Error(ErrorType.MissingEnvironmentVariable);
    }

    const expirationSeconds = process.env.JWT_TOKEN_EXPIRE;
    if (!expirationSeconds) {
        throw new Error(ErrorType.MissingEnvironmentVariable);
    }

    const token = jwt.sign(payload, secret, { expiresIn: expirationSeconds, algorithm: 'RS256' });
    return token;
}

export const parseToken = (token: string) => {
    // 同じ処理を書いてるのまとめたい
    const secret = process.env.JWT_KEY;
    if (!secret) {
        throw new Error(ErrorType.MissingEnvironmentVariable);
    }

    const decoded = jwt.verify(token, secret) as TokenPayload;
    if (decoded && decoded.userID) {
        return decoded.userID;
    } else {
        throw new Error(ErrorType.InvalidToken);
    }
}