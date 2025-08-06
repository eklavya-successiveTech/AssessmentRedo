import Joi from 'joi';

export const registerSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).pattern(RegExp('^[a-zA-Z0-9]{6,30}$')).required(),
    role: Joi.string().valid('user','admin').default('user')
});