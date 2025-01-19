import { Request, Response, NextFunction} from "express"
import jwt, { JwtPayload } from "jsonwebtoken"
import { JWT_SECRET } from "./config"
export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers['authorization'] || ''
    console.log(token,' -token')
    if(!token){
        res.status(401).json({message: "Unauthorized"})
        return
    }
    try{
        const decoded = jwt.verify(token,JWT_SECRET)
        if(typeof decoded === 'string' || !decoded.phoneNumber){
            res.status(401).json({message: "Invalid token"})
            return
        } 
        // @ts-ignore
        req.phoneNumber = (decoded as JwtPayload).phoneNumber
        next()  
    }catch(e){
        console.log('erorr occured in middleware')
    }
}