import { NextFunction, Request, Response } from "express";

export interface NewUserRequestBody {
  name: string;
  email: string;
  photo: string;
  _id: string;
  dob: Date;
  gender: string;
}


export interface NewProductRequestBody {
  name: string;
  category: string;
  price:number;
  stock:number;
}

export type ControllerType = (
  req: Request,
  res:Response,
  next: NextFunction
) => Promise<void | Response<any, Record<string, any>>>;
