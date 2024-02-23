import {Request, response, Response} from 'express';
import User from '../models/user';
import { hash, compare } from 'bcrypt'
import { validationResult } from 'express-validator';
import * as jwt from "jsonwebtoken"
import {createTransport} from 'nodemailer'

import dotenv from "dotenv";
dotenv.config();

const sendgridTransport = require('nodemailer-sendgrid-transport')

// import { createTransport } from "nodemailer" //unimplemented for now cause difficultires
const tokenSECRET = process.env.TOKEN_SECRET as string;
const saltRounds = 10 //for when a user signs up

const transporter = createTransport(sendgridTransport({
    auth: {
        api_key: process.env.SENDGRID_TOKEN
    }
}))

const generateAccessToken = (userId: string, email: string, time: string) => { // this is like this incase its used for extra things
    return jwt.sign({email: email}, tokenSECRET, {expiresIn: time})
}

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
        const emailConfirmationCode = Math.floor(100000 + Math.random() * 900000)

        const user = new User({
            name: name,
            email: email,
            passwordHash: passwordHash,
            emailConfirmationCode: emailConfirmationCode
        });
        await user.save();
        /* unused for now
        await transporter.sendMail({
            to: email,
            from: '',
            subject: 'Your email verification code',
            html: '<h1>Thank you for signing up!<br>Your verification code is ${emailConfirmationCode}</h1>'
        })
        */
        const userToken = generateAccessToken(user._id, email, "1 day")
        res.status(200).json({token:userToken, user: { email: email, name: name} });
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
                if (!user) {
                    res.status(404).json({ message: "User does not exist." });
                    return
                }
                compare(password, user.passwordHash/*forgot how to fix possibly null*/).then(result => {
                    if (result) {
                        if (user.emailConfirmed == false) {
                            res.status(400).json({ message: "User is not verified." });
                            return
                        }
                        const userToken = generateAccessToken(user._id, email, "1 day")
                        res.status(200).json({ token: userToken, user: { email: email, name: user.name } });
                    } else {
                        res.status(401).json({ message: "Invalid credentials" });
                    }
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