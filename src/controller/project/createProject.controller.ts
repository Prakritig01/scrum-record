import { NextFunction, Request, Response } from "express";
import { asyncHandler } from "../../middleware/asyncHandler";
import Project from "../../model/project.model";
import { AuthRequest } from "../../middleware/authMiddleware";


export const createProject = asyncHandler(async (req : AuthRequest , res : Response , next : NextFunction) => {
    const { name, description, status, members } = req.body;

    if (!name || !description) {
        return res.status(400).json({ message: "Name and description are required" });
    }

    console.log("req.user:", req.user);

    const newProject = {
        name,
        description,
        status: status || 'pending',
        members: members || [],
        createdBy : req.user._id, 
    };

    // console.log("Creating project with data:", newProject);

   const project = new Project(newProject);
   await project.save();

    res.status(201).json({ message: "Project created successfully", project });
})