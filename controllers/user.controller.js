import bcrypt from 'bcryptjs'
import jwt from "jsonwebtoken"
import {UserModel} from '../models/user.model.js'

// /api/v1/users/register
const register = async(req,res) =>{
    try {
        const {username, email, password} = req.body

        const missingFields = [];
        if (!username) missingFields.push('username');
        if (!email) missingFields.push('email');
        if (!password) missingFields.push('password');

        if (missingFields.length > 0) {
            return res.status(400).json({
            ok: false,
            msg: `Faltan los siguientes campos: ${missingFields.join(', ')}`
            });
        }


        const user = await UserModel.findOneByEmail(email)
        if(user){
            return res.status(409).json({ok: false, msg: "El email ya existe"})
        }

        const salt = await bcrypt.genSalt(10)//se generan palabras aleatorias para la contraseña
        const hashedPassword = await bcrypt.hash(password, salt) //creacion de la contraseña hasheada

        const newUser = await UserModel.create({email, password: hashedPassword, username})

        const token = jwt.sign({email: newUser.email, role_id: newUser.role_id},
            process.env.JWT_SECRET,
            {
                expiresIn:"1h"
            }
        )

        return res.status(201).json({ ok:true, msg: token})
    } catch (error) {
        console.error(error);
    
        return res.status(500).json({
            ok: false,
            msg: 'Error en el servidor'
        });
    }
}

// /api/v1/users/login
const login = async(req,res) =>{
    try {
        const {email, password} = req.body

        const missingFields = []
        if (!email) missingFields.push('email')
        if (!password) missingFields.push('password')

        if (missingFields.length > 0) {
            return res.status(400).json({
            ok: false,
            msg: `Faltan los siguientes campos: ${missingFields.join(', ')}`
            });
        }

        const user = await UserModel.findOneByEmail(email)
        if(!user){
            return res.status(404).json({ok: false, msg: "Email no encontrado"})
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if(!isMatch){
            return res.status(401).json({ok: false, msg:"Contraseña incorrecta"})
        }

        const token = jwt.sign({email: user.email, role_id: user.role_id},
            process.env.JWT_SECRET,
            {
                expiresIn:"1h"
            }
        )

        return res.json({ ok:true, msg: token})
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: 'Error en el servidor'
        })
    }
}

const profile = async(req,res)=>{
    try {
        
        const user = await UserModel.findOneByEmail(req.email)
        return res.json({ok:true, msg: {email: user.email, username: user.username}})

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: 'Error en el servidor'
        })
    }
}

export const UserController={
    register,
    login,
    profile
}