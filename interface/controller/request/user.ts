import Joi from 'joi';

export interface userCreateRequestData {
    name: string;
    email: string;
    pass: string;
}

export const userCreateRequest = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    pass: Joi.string().required().min(8),
});

export const userLoginRequest = Joi.object({
    email: Joi.string().email().required(),
    pass: Joi.string().required(),
});