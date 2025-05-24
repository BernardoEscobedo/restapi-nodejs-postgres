import jwt from "jsonwebtoken"

export const verifyToken = (req, res, next)=> {
    
    let token = req.headers.authorization

    if(!token){
        return res.status(401).json({error: "Sin token"});
    }

    console.log({token})

    token = token.split(" ")[1]

    console.log({token})
    try {

        const {email, role_id} = jwt.verify(token, process.env.JWT_SECRET)
        console.log(email)
        req.email = email
        req.role_id = role_id
        next()   
    } catch (error) {
        console.log(error)
        return res.status(400).json({error: "token invalido"})
    }
}

export const verifyAdmin =(req, res, next)=>{//aqui se valida si el usuario es tipo admin
    if(req.role_id == 1){
        return next()//si es admin se dirige a la siguiente funcion
    }
    return res.status(403).json({error: "No autorizado, solamente usuario administrador"})
}

export const verifyVet = (req, res, next) => {
    if (req.role_id ==2 || req.role_id == 1){
        return next()
    }
    return res.status(403).json({error: "Solamente usuario Veterinario"})
}