import { TryCath } from "../middlewares/error.js";
import { Request } from "express";
import { NewProductRequestBody } from "../types/types.js";
import { Product } from "../models/product.js";

export const newProduct = TryCath(
  async (req: Request<{}, {}, NewProductRequestBody>, res, next) => {
    const { name, price, stock, category } = req.body;

    const photo = req.file;

    await Product.create({
      name,
      price,
      stock,
      category: category.toLowerCase(),
      photo: photo?.path,
    });

    return res.status(201).json({
      success: true,
      message: "Product Created Successfully",
    });
  }
);
