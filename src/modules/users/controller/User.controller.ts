import { Request, Response, NextFunction } from "express";
import { UserService } from "../services/User.service";

export class UserController {
    static async register(req: Request, res: Response, next: NextFunction){
        try{
            const { email, password, role } = req.body;
            const user = await UserService.register(email, password, role);

            res.status(201).json({
                message: 'User registered Successfully',
                user: {
                    id: user._id,
                    email: user.email,
                    role: user.role,
                },
            });
        }
        catch(err){
            next(err);
        }
    }

    static async login(req: Request, res: Response, next: NextFunction){
        try{
            const {email, password} = req.body;
            const result = await UserService.login(email,password);

            res.status(200).json({
                message: "Login Successful",
                ...result,
            })
        }
        catch(err){
            next(err);
        }
    }
}