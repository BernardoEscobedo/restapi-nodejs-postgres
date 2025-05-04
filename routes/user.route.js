import {Router} from "express";
import { UserController } from "../controllers/user.controller.js";
//import { verify } from "jsonwebtoken";
import { verifyToken } from "../middlewares/jwt.middlewares.js";

const router = Router()

router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.get('/profile', verifyToken, UserController.profile)//ruta protegida

export default router;