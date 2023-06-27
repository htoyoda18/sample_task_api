import dotenv from 'dotenv';

dotenv.config();

interface EnvConfig {
    JWT_KEY: string;
    JWT_TOKEN_EXPIRE: number;
}

export const envConfig: EnvConfig = {
    JWT_KEY: process.env.JWT_KEY as string,
    JWT_TOKEN_EXPIRE: parseInt(process.env.JWT_TOKEN_EXPIRE as string, 10),
};