import { TryCath } from "../middlewares/error.js";
import { Request } from "express";
import { NewProductRequestBody } from "../types/types.js";
import { Product } from "../models/product.js";
import ErrorHandler from "../utils/utility-class.js";
import { rm } from "fs";
import { privateDecrypt } from "crypto";

export const newProduct = TryCath(
  async (req: Request<{}, {}, NewProductRequestBody>, res, next) => {
    const { name, price, stock, category } = req.body;

    const photo = req.file;

    if (!photo) return next(new ErrorHandler("Please add Photo", 400));

    if (!name || !price || !stock || !category) {
      rm(photo.path, () => {
        console.log("Deleted");
      });

      return next(new ErrorHandler("Please Enter All fields", 400));
    }

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

export const getLatestProducts = TryCath(
  async (req: Request<{}, {}, NewProductRequestBody>, res, next) => {
    const products = await Product.find({}).sort({ createdAt: -1 }).limit(5);

    return res.status(200).json({
      success: true,
      products,
    });
  }
);

export const getAllCategories = TryCath(
  async (req: Request<{}, {}, NewProductRequestBody>, res, next) => {
    const categories = await Product.distinct("category");

    return res.status(200).json({
      success: true,
      categories,
    });
  }
);

export const getAdminProducts = TryCath(
  async (req: Request<{}, {}, NewProductRequestBody>, res, next) => {
    const products = await Product.find({});

    return res.status(200).json({
      success: true,
      products,
    });
  }
);

export const getSingleProduct = TryCath(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  return res.status(200).json({
    success: true,
    product,
  });
});

export const updateProduct = TryCath(async (req, res, next) => {
  const { name, price, stock, category } = req.body;

  const { id } = req.params;

  const photo = req.file;

  const product = await Product.findById(id);

  if(!product) return next(new ErrorHandler("Invalid product Id",404));

  if (photo) {
    rm(product.photo, () => {
      console.log(" old Photo Deleted");
    });

    product.photo = photo.path
  }

   if(name) product.name = name;
   if(price) product.price = price;
   if(stock) product.stock = stock;
   if(category) product.category = category;

await product.save()


  return res.status(200).json({
    success: true,
    message: "Product Updated Successfully",
  });
});

export const deleteProduct = TryCath(async (req, res, next) => {

    const product = await Product.findById(req.params.id);
   
    if(!product) return next(new ErrorHandler("Product not found",404));
 
    rm(product.photo, () => {
        console.log(" Product photo Deleted");
    })

    await Product.deleteOne();

    return res.status(200).json({
      success: true,
      message: "Product Deleted Successfully",
      
    });
  });