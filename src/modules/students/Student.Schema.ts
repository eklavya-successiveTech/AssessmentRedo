import Joi from "joi";

export const StudentSchema = Joi.object({
    name: Joi.string().required(),
  age: Joi.number().required(),
  grade: Joi.string().required(),
  email: Joi.string().email().required(),
  createdAt: Joi.date().required(),
})