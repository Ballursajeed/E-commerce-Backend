import { TryCath } from "../middlewares/error.js";
import { Coupon } from "../models/coupon.js";
import ErrorHandler from "../utils/utility-class.js";
export const newCoupon = TryCath(async (req, res, next) => {
    const { coupon, amount } = req.body;
    if (!coupon || !amount)
        return next(new ErrorHandler("Please Enter Both Coupon and Amount", 400));
    await Coupon.create({ code: coupon, amount });
    return res.status(201).json({
        success: true,
        message: `Coupon ${coupon} Created successfully`,
    });
});
export const applyDiscounts = TryCath(async (req, res, next) => {
    const { coupon } = req.query;
    const discount = await Coupon.findOne({ code: coupon });
    if (!discount)
        return next(new ErrorHandler("Invalid Coupon Code", 400));
    return res.status(200).json({
        success: true,
        discount: discount.amount,
    });
});
export const allCoupons = TryCath(async (req, res, next) => {
    const coupons = await Coupon.find({});
    return res.status(200).json({
        success: true,
        coupons
    });
});
export const deleteCoupon = TryCath(async (req, res, next) => {
    const { id } = req.params;
    const coupon = await Coupon.findByIdAndDelete(id);
    if (!coupon)
        return next(new ErrorHandler("Invalid ID", 400));
    return res.status(200).json({
        success: true,
        message: `Coupon ${coupon?.code} Deleted Successfully`
    });
});
