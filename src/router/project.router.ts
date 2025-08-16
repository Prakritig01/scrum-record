import { Router } from "express";
import { validate } from "../middleware/validate";
import {
  createProject as createProjectSchema,
  updateProject as updateProjectSchema,
  addMemberSchema,
  removeMemberSchema,
} from "../validation/project.validation";
import {
  createProject,
  getProjectById,
  getProjects,
  addMemberToProject,
  removeMemberFromProject,
  updateProjectDetails,
} from "../controller/project/index";

const router = Router();

router.get("/", getProjects);
router.post("/create", validate(createProjectSchema), createProject);

router.get("/:id", getProjectById);
router.put("/:id", validate(updateProjectSchema), updateProjectDetails);
router.post("/:id/add-member", validate(addMemberSchema), addMemberToProject);
router.post(
  "/:id/remove-member",
  validate(removeMemberSchema),
  removeMemberFromProject
);

export default router;
