import {UserModel} from '../models/user.model.js'

// /api/v1/users/register
const register = async(req,res) =>{
    try {
        consoler.log(req.body)
        const {username, email, password} = req.body

        return res.json({ ok:true, msg: "usuario registrado"})
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