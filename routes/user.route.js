import {Router} from "express";
import { UserController } from "../controllers/user.controller.js";

const router = Router()

router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.get('/profile', UserController.profile)

export default router;