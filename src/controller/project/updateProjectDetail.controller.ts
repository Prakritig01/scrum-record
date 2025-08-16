import { Request, Response } from "express";
import Project from "../../model/project.model";

export const updateProjectDetails = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const project = await Project.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    }).populate("members", "name email")
      .populate("createdBy", "name email");

    if (!project) {
      return res.status(404).json({ success: false, message: "Project not found" });
    }

    res.status(200).json({
      success: true,
      data: project,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
