import jwt from "jsonwebtoken"

export const verifyToken = (req, res, next)=> {
    
    let token = req.headers.authorization

    if(!token){
        return res.status(401).json({error: "Sin token"});
    }

    next()
}