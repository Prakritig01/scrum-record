import { NextFunction, Request, Response } from "express";
import { asyncHandler } from "../../middleware/asyncHandler";
import User from "../../model/user.model";
import { signAccessToken } from "../../utils/signAccessToken";

export const createUser = asyncHandler(async(req: Request, res: Response, next: NextFunction) => {
    const { name, email, password } = req.body;
    if(!name || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findOne({ email });
    if (user) {
        return res.status(400).json({ message: "User already exists" });
    }

    const newUser = new User({ name, email, password });
    await newUser.save();

    const token = signAccessToken(email);
    res.status(201).json({ message: "User created successfully", user: newUser , token });
});

