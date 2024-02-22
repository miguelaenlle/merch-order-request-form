import {Request, response, Response} from 'express';
import User from '../models/user';
import { hash, compare } from 'bcrypt'
import { validationResult } from 'express-validator';
// import { createTransport } from "nodemailer" //unimplemented for now cause difficultires

const saltRounds = 10 //for when a user signs up

/*const transporter = createTransport(sendgridTransport({
    auth: {
        api_key: process.env.SENDGRID_TOKEN
    }
}))*/

export const createUser = async (req: Request, res: Response) => {
    // Check for validation errors
    console.log("Req.body", req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log("errors", errors);
        return res.status(400).json({ errors: errors.array() });
    }

    // Proceed with creating the User object
    try {
        const name = req.body.name as string;
        const email = req.body.email as string;
        const password = req.body.password as string;

        let passwordHash: string;
        passwordHash = await hash(password, saltRounds);

        const user = new User({
            name: name,
            email: email,
            passwordHash: passwordHash,
            emailConfirmationCode: "22222"
        });
        await user.save();
        res.status(201).json({user});
    } catch (error: any) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

export const loginUser = async (req: Request, res: Response) => {

    console.log("Req.body", req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log("errors", errors);
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const email = req.body.email as string;
        const password = req.body.password as string;
        User.findOne({email: email})
            .then(user => {
                compare(password, user!.passwordHash/*forgot how to fix possibly null*/).then(result => {
                    res.status(200).json({ message: 'Success', isPasswordCorrect: result });
                }).catch (error => {
                    res.status(500).json({ message: 'Server error', error: error.message });
                })
            }).catch (error => {
            res.status(500).json({ message: 'Server error', error: error.message });
        })
    } catch (error: any) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}