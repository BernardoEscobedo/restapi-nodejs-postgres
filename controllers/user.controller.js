import bcrypt from 'bcryptjs'
import {UserModel} from '../models/user.model.js'

// /api/v1/users/register
const register = async(req,res) =>{
    try {
        const {username, email, password} = req.body

        if(!username || !email || !password){
            return res.status(400).json({ok: false, msg: "La solicitud requiere los siguientes datos: correo, contraseña y usuario"})
        }

        const user = await UserModel.findOneByEmail(email)
        if(user){
            return res.status(409).json({ok: falso, msg: "El email ya existe"})
        }

        const salt = await bcrypt.genSalt(10)//se generan palabras aleatorias para la contraseña
        const hashedPassword = await bcrypt.hash(password, salt) //creacion de la contraseña hasheada

        const newUser = await UserModel.create({email, password: hashedPassword, username})

        return res.status(201).json({ ok:true, msg: newUser})
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: 'Error en el servidor'
        })
    }
}

// /api/v1/users/login
const login = async(req,res) =>{
    try {
        
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
    login
}