import { NextFunction, Response } from "express";
import { AuthRequest } from "../../middleware/authMiddleware";
import Project from "../../model/project.model";

export const getProjects = async (req: AuthRequest, res: Response,next : NextFunction) => {
  try {
    const projects = await Project.find()
      .populate("createdBy", "name email")  // sirf name aur email dikhana hai
      .populate("members", "name email");   // same for members

    res.status(200).json({
      success: true,
      count: projects.length,
      data: projects,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
