import bcrypt from "bcrypt";
import { IUser, UserModel } from "../models/User.model";
import createError from "http-errors";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

export class UserService {
  static async register(
    email: string,
    password: string,
    role: "admin" | "user"
  ) {
    const existing = await UserModel.findOne({ email });
    if (existing) {
      throw new Error("Email already registered");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new UserModel({ email, password: hashedPassword, role });
    return user.save();
  }

  static async login(email: string, password: string) {
    const user = await UserModel.findOne({ email });

    if (!user) {
      throw createError(401, "Invaild credentials");
    }
    const matchPassword = await bcrypt.compare(password, user.password);

    if (!matchPassword) {
      throw createError(401, "Invalid credentials");
    }
    if (!JWT_SECRET) {
      throw new Error(
        "JWT_SECRET must be defined in your environment variables"
      );
    }
    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        role: user.role,
      },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    return {
      token,
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
      },
    };
  }
}
