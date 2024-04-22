import { User } from "../models/user.js";
import { TryCath } from "../middlewares/error.js";
import ErrorHandler from "../utils/utility-class.js";
export const newUser = TryCath(async (req, res, next) => {
    const { name, email, photo, gender, _id, dob } = req.body;
    let user = await User.findById(_id);
    if (user)
        return res.status(200).json({
            success: true,
            message: `Welcome ${user.name}`,
        });
    if (!_id || !name || !email || !photo || !gender || !dob)
        return next(new ErrorHandler("Please add All fields", 400));
    user = await User.create({
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
});
export const getAllUsers = TryCath(async (req, res, next) => {
    const users = await User.find({});
    return res.status(201).json({
        success: true,
        users
    });
});
