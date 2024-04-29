import { myCache } from "../app.js";
import { TryCath } from "../middlewares/error.js";
import { Product } from "../models/product.js";
import { User } from "../models/user.js";
import { Order } from "../models/order.js";
import { calculatePercentage, getInvetories } from "../utils/features.js";
export const getDashboardStats = TryCath(async (req, res, next) => {
    let stats = {};
    if (myCache.has("admin-stats"))
        stats = JSON.parse(myCache.get("admin-stats"));
    else {
        const today = new Date();
        const sixMonthsAgo = new Date();
        sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
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
        const LastSixMonthOrdersPromise = Order.find({
            createdAt: {
                $gte: sixMonthsAgo,
                $lte: today,
            },
        });
        const latestTransactionsPromise = Order.find({})
            .select(["orderItems", "discount", "total", "status"])
            .limit(4);
        const [thisMonthProducts, thisMonthUsers, thisMonthOrders, LastMonthProduct, LastMonthUsers, LastMonthOrders, productsCount, usersCount, allOrders, LastSixMonthOrders, categories, femaleUsersCount, latestTransactions,] = await Promise.all([
            thisMonthProductsPromise,
            thisMonthUsersPromise,
            thisMonthOrdersPromise,
            LastMonthProductPromise,
            LastMonthUsersPromise,
            LastMonthOrdersPromise,
            Product.countDocuments(),
            User.countDocuments(),
            Order.find({}).select("total"),
            LastSixMonthOrdersPromise,
            Product.distinct("category"),
            User.countDocuments({ gender: "female" }),
            latestTransactionsPromise,
        ]);
        const thisMonthRevenue = thisMonthOrders.reduce((total, order) => total + (order.total || 0), 0);
        const LastMonthRevenue = LastMonthOrders.reduce((total, order) => total + (order.total || 0), 0);
        const Changepercent = {
            revenue: calculatePercentage(thisMonthRevenue, LastMonthRevenue),
            product: calculatePercentage(thisMonthProducts.length, LastMonthProduct.length),
            user: calculatePercentage(thisMonthUsers.length, LastMonthUsers.length),
            order: calculatePercentage(thisMonthOrders.length, LastMonthOrders.length),
        };
        const revenue = allOrders.reduce((total, order) => total + (order.total || 0), 0);
        const counts = {
            revenue,
            user: usersCount,
            product: productsCount,
            order: allOrders.length,
        };
        const orderMonthCounts = new Array(6).fill(0);
        const orderMonthRevenue = new Array(6).fill(0);
        LastSixMonthOrders.forEach((order) => {
            const creationData = order.createdAt;
            const monthDiff = today.getMonth() - creationData.getMonth();
            if (monthDiff < 6) {
                orderMonthCounts[6 - monthDiff - 1] += 1;
                orderMonthRevenue[6 - monthDiff - 1] += order.total;
            }
        });
        const categoryCount = await getInvetories({
            categories,
            productsCount,
        });
        const userRatio = {
            male: usersCount - femaleUsersCount,
            female: femaleUsersCount,
        };
        const modifyLatestTransaction = latestTransactions.map((i) => ({
            _id: i._id,
            discount: i.discount,
            amount: i.total,
            quantity: i.orderItems.length,
            status: i.status,
        }));
        stats = {
            Changepercent,
            categoryCount,
            counts,
            chart: {
                order: orderMonthCounts,
                revenue: orderMonthRevenue,
            },
            userRatio,
            latestTransactions: modifyLatestTransaction,
        };
        myCache.set("admin-stats", JSON.stringify(stats));
    }
    return res.status(200).json({
        success: true,
        stats,
    });
});
export const getPieStats = TryCath(async (req, res, next) => {
    let charts;
    const key = "admin-stats";
    if (myCache.has(key))
        charts = JSON.parse(myCache.get(key));
    else {
        const [processingOrder, shippedOrder, deliveredOrder, categories, productsCount,] = await Promise.all([
            Order.countDocuments({ status: "Processing" }),
            Order.countDocuments({ status: "Shipped" }),
            Order.countDocuments({ status: "Delivered" }),
            Product.distinct("category"),
            Product.countDocuments(),
        ]);
        const orderFullFillment = {
            processing: processingOrder,
            shipped: shippedOrder,
            delivered: deliveredOrder,
        };
        console.log(orderFullFillment.processing, orderFullFillment.shipped, orderFullFillment.delivered);
        const productCategoriesRatio = await getInvetories({
            categories,
            productsCount,
        });
        charts = {
            orderFullFillment,
            productCategoriesRatio,
        };
        myCache.set(key, JSON.stringify(charts));
    }
    return res.status(200).json({
        success: true,
        charts,
    });
});
export const getBarStats = TryCath(async (req, res, next) => { });
export const getLineStats = TryCath(async (req, res, next) => { });
