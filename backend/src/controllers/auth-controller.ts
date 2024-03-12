import { Request, Response } from 'express';
import User from '../models/user';
import { hash, compare } from 'bcrypt'
import { validationResult } from 'express-validator';
import * as jwt from "jsonwebtoken"
import { createTransport } from 'nodemailer'

import dotenv from "dotenv";
dotenv.config();

const sendgridTransport = require('nodemailer-sendgrid-transport')

// import { createTransport } from "nodemailer" //unimplemented for now cause difficultires
const tokenSECRET = process.env.TOKEN_SECRET as string;
const saltRounds = 10 //for when a user signs up

const transporter = createTransport(sendgridTransport({
    auth: {
        api_key: process.env.SENDGRID_TOKEN_PERSONAL
    }
}))

const generateAccessToken = async (type: string, userId: string, email: string, time: string) => { // this is like this incase its used for extra things
    return jwt.sign({ type: type, userId: userId, email: email }, tokenSECRET, { expiresIn: time })
}
const generateEmailConfirmation = async () => {
    const emailConfirmationCode = Math.floor(100000 + Math.random() * 900000)
    const emailConfirmationCodeDate: string = new Date().getTime().toString()
    return {
        Code: emailConfirmationCode,
        Date: emailConfirmationCodeDate
    }
}
const checkEmailConfirmationDateValidity = async (dateString: string) => {
    const codeDate = Number(dateString)
    const currentDate = new Date().getTime()

    const difference = currentDate - codeDate
    const totalMsInMin = 1000 * 60

    return Math.floor(difference / totalMsInMin) <= 30;
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

        //duplicate email checking
        const userCheck = await User.findOne({ email: email })
        if (userCheck) {
            res.status(409).json({ message: "Duplicate email" });
            return
        }

        let passwordHash: string;
        passwordHash = await hash(password, saltRounds);
        const emailConfirmation = await generateEmailConfirmation()

        const user = new User({
            name: name,
            email: email,
            passwordHash: passwordHash,
            emailConfirmationCode: emailConfirmation.Code,
            emailConfirmationCodeDate: emailConfirmation.Date
        });

        await user.save();
        await transporter.sendMail({
            to: email,
            from: process.env.SENDGRID_EMAIL_PERSONAL,
            subject: 'Your email verification code',
            html: `<h1>Thank you for signing up!<br>Your verification code is ${emailConfirmation.Code}</h1>`
        })

        //const userToken = await generateAccessToken(user._id, email, "1 day") //shouldnt be included
        res.status(200).json({ message: "Account created and confirmation email sent.", user: { email: email, name: name } });
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
        const user = await User.findOne({ email: email })
        if (!user) {
            res.status(404).json({ message: "User does not exist." });
            return
        }
        const result = await compare(password, user.passwordHash)
        if (result) {
            if (user.emailConfirmed == false) {
                res.status(400).json({ message: "User is not verified." });
                return
            }
            const userToken = await generateAccessToken("login", user._id, email, "1 day")
            res.status(200).json({ token: userToken, user: { email: email, name: user.name } });
        } else {
            res.status(401).json({ message: "Invalid credentials" });
        }
    } catch (error: any) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

export const confirmEmail = async (req: Request, res: Response) => {
    const email = req.body.email as string
    const confirmationCode = req.body.confirmationCode as string

    try {
        const user = await User.findOne({ email: email })
        if (!user) {
            res.status(404).json({ message: "User does not exist." });
            return
        }
        if (user.emailConfirmed == true) {
            res.status(400).json({ message: "User already verified." });
            return
        }

        const codeValidity = await checkEmailConfirmationDateValidity(user.emailConfirmationCodeDate)
        if (!codeValidity) {
            res.status(401).json({ message: "Confirmation expired." });
            return
        }

        if (confirmationCode == user.emailConfirmationCode) {
            user.emailConfirmed = true
            await user.save()
            res.status(200).json({ message: "Email confirmed." });
        } else {
            res.status(401).json({ message: "Invalid code." });
        }

    } catch (error: any) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

export const resendConfirmationEmail = async (req: Request, res: Response) => {
    const email = req.body.email as string

    try {
        const user = await User.findOne({ email: email })
        if (!user) {
            res.status(404).json({ message: "User does not exist." });
            return
        }
        if (user.emailConfirmed == true) {
            res.status(400).json({ message: "User already verified." });
            return
        }

        const emailConfirmation = await generateEmailConfirmation()

        user.emailConfirmationCode = emailConfirmation.Code.toString()
        user.emailConfirmationCodeDate = emailConfirmation.Date

        await user.save()

        await transporter.sendMail({
            to: email,
            from: process.env.SENDGRID_EMAIL_PERSONAL,
            subject: 'Your email verification code',
            html: `<h1>Your verification code is ${emailConfirmation.Code}</h1>`
        })

        res.status(200).json({ message: "Confirmation code sent." });
    } catch (error: any) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}