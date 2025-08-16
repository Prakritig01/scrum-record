import { NextFunction, Request, Response } from "express";
import { asyncHandler } from "../../middleware/asyncHandler";
import { signAccessToken } from "../../utils/signAccessToken";
import User from "../../model/user.model";


export const signIn = asyncHandler(async (req : Request , res : Response , next : NextFunction) => {
    const {email ,password} = req.body;
    if(!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await User.findOne({email});
    if (!user) {
        return res.status(401).json({ message: "Invalid email or password" });
    }
    const isMatch  = await user.comparePassword(password);
    if (!isMatch) {
        return res.status(401).json({ message: "Invalid email or password" });
    }

    console.log("user", user);
    const token = signAccessToken(user._id.toString());
    res.status(200).json({ message: "Login successful", token, user });
})