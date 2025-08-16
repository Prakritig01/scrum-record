import { Request, Response } from "express";
import Project from "./../../model/project.model"

export const getProjectById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params; 

    
    const project = await Project.findById(id)
      .populate("members", "name email")   // sirf name aur email chahiye toh select kar sakte ho
      .populate("createdBy", "name email");

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    res.status(200).json({
      success: true,
      data: project,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
