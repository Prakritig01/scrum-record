import { Response } from "express";
import { AuthRequest } from "../../middleware/authMiddleware";
import Project from "../../model/project.model";

export const addMemberToProject = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params; // project id
    const { userId } = req.body; // user id to add

    const project = await Project.findById(id);

    if (!project) {
      return res.status(404).json({ success: false, message: "Project not found" });
    }

    if (project.members?.includes(userId)) {
      return res.status(400).json({ success: false, message: "User already a member" });
    }

    project.members?.push(userId);
    await project.save();

    const updatedProject = await Project.findById(id)
      .populate("members", "name email")
      .populate("createdBy", "name email");

    res.status(200).json({
      success: true,
      data: updatedProject,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
