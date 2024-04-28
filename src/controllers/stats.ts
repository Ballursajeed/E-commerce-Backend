import { features } from "process";
import { myCache } from "../app.js";
import { TryCath } from "../middlewares/error.js";
import { Product } from "../models/product.js";
import { User } from "../models/user.js";
import { Order } from "../models/order.js";
import { calculatePercentage } from "../utils/features.js";

export const getDashboardStats = TryCath(async (req, res, next) => {
  let stats = {};

  if (myCache.has("admin-stats"))
    stats = JSON.parse(myCache.get("admin-stats") as string);
  else {
    const today = new Date();

    const thisMonth = {
      start: new Date(today.getFullYear(), today.getMonth(), 1),
      end: today,
    };

    const lastMonth = {
      start: new Date(today.getFullYear(), today.getMonth() - 1, 1),
      end: new Date(today.getFullYear(), today.getMonth(), 0),
    };

    const thisMonthProductsPromise = Product.find({
      createdAt: {
        $gte: thisMonth.start,
        $lte: thisMonth.end,
      },
    });

    const LastMonthProductPromise = Product.find({
      createdAt: {
        $gte: lastMonth.start,
        $lte: lastMonth.end,
      },
    });

    const thisMonthUsersPromise = User.find({
      createdAt: {
        $gte: thisMonth.start,
        $lte: thisMonth.end,
      },
    });

    const LastMonthUsersPromise = User.find({
      createdAt: {
        $gte: lastMonth.start,
        $lte: lastMonth.end,
      },
    });

    const thisMonthOrdersPromise = Order.find({
      createdAt: {
        $gte: thisMonth.start,
        $lte: thisMonth.end,
      },
    });

    const LastMonthOrdersPromise = Order.find({
      createdAt: {
        $gte: lastMonth.start,
        $lte: lastMonth.end,
      },
    });

    const [
      thisMonthProducts,
      thisMonthUsers,
      thisMonthOrders,
      LastMonthProduct,
      LastMonthUsers,
      LastMonthOrders,
      productsCount,
      usersCount,
      allOrders,
    ] = await Promise.all([
      thisMonthProductsPromise,
      thisMonthUsersPromise,
      thisMonthOrdersPromise,
      LastMonthProductPromise,
      LastMonthUsersPromise,
      LastMonthOrdersPromise,
      Product.countDocuments(),
      User.countDocuments(),
      Order.find({}).select("total"),
    ]);

    const thisMonthRevenue = thisMonthOrders.reduce(
      (total, order) => total + (order.total || 0),
      0
    );

    const LastMonthRevenue = LastMonthOrders.reduce(
      (total, order) => total + (order.total || 0),
      0
    );

    const Changepercent = {
      revenue: calculatePercentage(thisMonthRevenue, LastMonthRevenue),

      product: calculatePercentage(
        thisMonthProducts.length,
        LastMonthProduct.length
      ),
      user: calculatePercentage(thisMonthUsers.length, LastMonthUsers.length),
      order: calculatePercentage(
        thisMonthOrders.length,
        LastMonthOrders.length
      ),
    };

    const revenue = allOrders.reduce(
      (total, order) => total + (order.total || 0),
      0
    );

    const counts = {
      revenue,
      user: usersCount,
      product: productsCount,
      order: allOrders.length,
    };

    stats = {
      Changepercent,
      counts,
    };
  }

  return res.status(200).json({
    success: true,
    stats,
  });
});

export const getPieStats = TryCath(async (req, res, next) => {});

export const getBarStats = TryCath(async (req, res, next) => {});

export const getLineStats = TryCath(async (req, res, next) => {});
