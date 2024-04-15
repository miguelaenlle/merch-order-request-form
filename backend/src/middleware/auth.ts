import * as jwt from "jsonwebtoken"
import { Request, Response } from 'express';

import dotenv from "dotenv";
import {JwtPayload} from "jsonwebtoken";

dotenv.config();

const tokenSECRET = process.env.TOKEN_SECRET as string;
export interface CustomRequest extends Request {
    token?: JwtPayload;
}

export const auth = async (req: Request, res: Response, next: Function) => {
    let decoded: JwtPayload

    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');

        if (!token) {
            throw new Error()
        } else {
            decoded = jwt.verify(token, tokenSECRET) as JwtPayload;
        }
    } catch (error: any) {
        //res.status(500).json({ message: 'Server error', error: error.message });
        decoded = {type: "none", userId: "none", email: "none"} as JwtPayload // oh yeah this is big brain time
    }
    (req as CustomRequest).token = decoded
    next();
};