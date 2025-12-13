import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

declare global {
    namespace Express {
        interface Request {
            userId?: string;
            role?: string;
        }
    }
}

export const authMiddleware = async (req: Request, res: Response, next : NextFunction) => {

    const token = req.headers.authorization;

    if(!token){
        return res.status(401).json({
            message : "Please provide a token"
        })
    }

    try{
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET as string) as { userId : string, role : string };
        req.userId = decodedToken.userId;
        req.role = decodedToken.role;
        next();
    }
    catch(error){
        return res.status(401).json({
            message : "You are not authorized to access this resource"
        })
    }
}

export const isAdmin = (req : Request, res : Response, next : NextFunction) => {
    try {
        if(req.role === "ADMIN"){
            next();
        }
        else{
            return res.status(401).json({
                message : "You are not authorized to access this resource"
            })
        }
    }
    catch(error){
        return res.status(401).json({
            message : "You are not authorized to access this resource"
        })
    }
}

export const isUser = (req : Request, res : Response, next : NextFunction) => {
    if(req.role === "USER"){
        next();
    }
    else{
        return res.status(401).json({
            message : "You are not authorized to access this resource"
        })
    }
}