import { ObjectSchema } from "joi";
import { Request, Response, NextFunction } from "express";
import createError from "http-errors";

export const validateRequest= (schema: ObjectSchema) => {
    return (req: Request, res: Response, next: NextFunction) =>{
        const { error } = schema.validate(req.body, {abortEarly: false});

        if(error){
            const message = error.details.map((d)=>d.message).join(', ');
            return next(createError(400, `Validation Error: ${message}`))
        }

        next();
    };
};