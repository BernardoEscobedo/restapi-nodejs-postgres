import {Router} from "express";
import { UserController } from "../controllers/user.controller.js";
//import { verify } from "jsonwebtoken";
import { verifyAdmin, verifyToken } from "../middlewares/jwt.middlewares.js";

const router = Router()

router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.get('/profile', verifyToken, UserController.profile)//ruta protegida

//Rutas para admin
router.get('/', verifyToken, verifyAdmin)

export default router;