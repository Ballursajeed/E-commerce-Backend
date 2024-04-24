import { User } from "../models/user.js";
import ErrorHandler from "../utils/utility-class.js";
import { TryCath } from "./error.js";

//middleware to make sure only admin is allowed
export const AdminOnly = TryCath(
    async (req,res,next) => {

        const { id } = req.query;

        if (!id) return next(new ErrorHandler("Please Login First",401));

        const user = await User.findById(id);

        if (!user) return next(new ErrorHandler("Invalid Id",401));

        if (user?.role !== "admin") return next(new ErrorHandler("UnAuthorized Access",401))
       
         next();

    }
) 
