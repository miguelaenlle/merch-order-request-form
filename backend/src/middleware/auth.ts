import {NextFunction, Request, Response} from 'express';
import * as jwt from "jsonwebtoken"

import dotenv from "dotenv";

dotenv.config();

const tokenSECRET = process.env.TOKEN_SECRET as string;
export interface CustomRequest extends Request {
    token: string | jwt.JwtPayload;
}

export const auth = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');

        if (!token) {
            throw new Error()
        }

        (req as CustomRequest).token = jwt.verify(token, tokenSECRET);

        next();
    } catch (error: any) {
        res.status(401).json({ message: "Please authenticate" });
    }
};