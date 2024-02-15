import { Request, Response } from 'express';
import Dummy2 from '../models/dummy2';
import { validationResult } from 'express-validator';

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

        const dummy = new Dummy2({
            name: name,
            email: email
        });
        await dummy.save();
        res.status(201).json({dummy});
    } catch (error: any) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};