import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
const JWT_SECRET= process.env.JWT_SECRET;


export const userMiddleware = (req:Request , res:Response , next:NextFunction) => { 
    const header = req.headers['authorization']; 
    // if(!JWT_SECRET){ 
    //     res.status(500).json({
    //         message:"jwet secret is not defined"
    //     })
    //     return;
    // }
    const decoded = jwt.verify(header as string , "secret");

    if(decoded){ 
        //@ts-ignore
        req.userId = decoded.id;
        next();
    }else{ 
        res.status(403).json({
            message:"you are not loggined"
        })
    }



}


