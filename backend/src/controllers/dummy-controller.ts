import { Request, Response } from 'express';
import Dummy from '../models/dummy';
import { validationResult } from 'express-validator';
import { CustomRequest } from "../middleware/auth";
import { JwtPayload } from "jsonwebtoken";

export const createDummy = async (req: Request, res: Response) => {
    // Check for validation errors
    console.log("Req.body", req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log("errors", errors);
        return res.status(400).json({ errors: errors.array() });
    }

    // Proceed with creating the Dummy object
    try {
        const name = req.body.name as string;
        const email = req.body.email as string;

        const dummy = new Dummy({
            name: name,
            email: email
        });
        await dummy.save();
        res.status(201).json({dummy});
    } catch (error: any) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

export const dummyTokenTest = async (req: CustomRequest, res: Response) => {
    if (!req.token) {
        res.status(400).json({ message: 'Token missing'});
        return
    }
    console.log("req.token", req.token)
}

export const getDummies = async (req: Request, res: Response) => {
    try {
        const dummies = await Dummy.find();
        res.status(200).json(dummies);
    } catch (error: any) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}