import Joi from 'joi';

export const userCreateRequest = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    pass: Joi.string().required().min(8),
});

export const userLoginRequest = Joi.object({
    email: Joi.string().email().required(),
    pass: Joi.string().required(),
});