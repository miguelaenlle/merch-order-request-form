import {NextFunction, Request, Response} from 'express';
import * as jwt from "jsonwebtoken"

import dotenv from "dotenv";
import {JwtPayload} from "jsonwebtoken";

dotenv.config();

const tokenSECRET = process.env.TOKEN_SECRET as string;
export interface CustomRequest extends Request {
    token: any;
}

export const auth = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');

        if (!token) {
            throw new Error()
        }

        const decoded = jwt.verify(token, tokenSECRET) as string;
        (req as CustomRequest).token = JSON.parse(decoded)

        next();
    } catch (error: any) {
        res.status(401).json({ message: "Please authenticate" });
    }
};