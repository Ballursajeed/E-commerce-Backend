import { NextFunction, Request, Response } from "express";
import { User } from "../models/user.js";
import { NewUserRequestBody } from "../types/types.js";
import { TryCath } from "../middlewares/error.js";

export const newUser = TryCath(
  async (
    req: Request<{}, {}, NewUserRequestBody>,
    res: Response,
    next: NextFunction
  ) => {


      throw new Error("some err")

      const { name, email, photo, gender, _id, dob } = req.body;

      const user = await User.create({
        name,
        email,
        photo,
        gender,
        _id,
        dob: new Date(dob),
      });

      return res.status(201).json({
        success: true,
        message: `Welcome, ${user.name}`,
      });
    } 
)