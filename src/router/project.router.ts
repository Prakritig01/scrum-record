import { Router } from "express";
import { validate } from "../middleware/validate";
import { createProject as createProjectSchema } from "../validation/project.validation";
import { createProject, getProjects } from "../controller/project/index";

const router = Router();

router.get('/', getProjects);
router.post('/create', validate(createProjectSchema), createProject);

export default router;