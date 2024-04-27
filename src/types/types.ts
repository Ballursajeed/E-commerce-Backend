import exp from "constants";
import { NextFunction, Request, Response } from "express";
import { disconnect } from "process";

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
  price: number;
  stock: number;
}

export type ControllerType = (
  req: Request<any>,
  res: Response,
  next: NextFunction
) => Promise<void | Response<any, Record<string, any>>>;

export type SearchRequestQuery = {
  search?: string;
  price?: string;
  category?: string;
  sort?: string;
  page?: string;
};

export interface BaseQuery {
  name?: {
    $regex: string;
    $options: "i";
  };
  price?: {
    $lte: number;
  };
  category?: string;
}

export type InvalidateCacheProps = {
  product?:boolean;
  order?: boolean;
  admin?:boolean;
};

export type OrderITemType = {
  name:string;
  photo:string;
  price:number;
  quantity:number;
  productId:string
}

export type ShippingInfoType = {
  address:string;
  city:string;
  state:string;
  country:string;
  pinCode:number;
}

export interface NewOrderRequestBody  {
  shippingInfo: {};
  user:string;
  subtotal:number;
  tax:number;
  shippingCharges:number;
  total:number;
  discount:number;
  orderItems:OrderITemType[];
}
