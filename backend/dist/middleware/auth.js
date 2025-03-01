"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET = process.env.JWT_SECRET;
const userMiddleware = (req, res, next) => {
    const header = req.headers['authorization'];
    // if(!JWT_SECRET){ 
    //     res.status(500).json({
    //         message:"jwet secret is not defined"
    //     })
    //     return;
    // }
    const decoded = jsonwebtoken_1.default.verify(header, "secret");
    if (decoded) {
        //@ts-ignore
        req.userId = decoded.id;
        next();
    }
    else {
        res.status(403).json({
            message: "you are not loggined"
        });
    }
};
exports.userMiddleware = userMiddleware;
