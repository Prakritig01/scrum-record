import { Router } from "express";
import { validate } from "../middleware/validate";
import { createUserSchema, loginUserSchema } from "../validation/user.validation";
import {createUser,signIn} from '../controller/index'

const router = Router();

router.post('/signup',validate(createUserSchema), createUser);
router.post('/signin',validate(loginUserSchema), signIn);

export default router;