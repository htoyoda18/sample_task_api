import Joi from 'joi';

export const taskCreateRequest = Joi.object({
    title: Joi.string().required(),
    deadline: Joi.date().required(),
});