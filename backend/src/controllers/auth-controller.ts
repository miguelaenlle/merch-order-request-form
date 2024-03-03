import {Request, Response} from 'express';
import User, {IUser} from '../models/user';
import bcrypt, {compare, hash} from 'bcrypt';
import {validationResult} from 'express-validator';
import crypto from 'crypto';
import nodemailer from "nodemailer";
import nodemailerSendgrid from "nodemailer-sendgrid";

import dotenv from "dotenv";
dotenv.config();

const apiKey = process.env.SENDGRID_TOKEN_PERSONAL as string;
const saltRounds = 10 //for when a user signs up
const transporter = nodemailer.createTransport(nodemailerSendgrid({
    apiKey: apiKey
}));
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
            emailConfirmed: true,
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

export const postReset = async (req: Request, res: Response) => {
    try {
        crypto.randomBytes(32, (err, buf) => {
           if (err){
               console.log(err);
           }
           const token = buf.toString('hex');
            const resetPassword = async ({req, res}: { req: any, res: any }) => {
                try {
                    const user = await User.findOne({ email: req.body.email });
                    if (!user) {
                        console.log("No account with that email found");
                        return res.status(404).json({ error: "No account with that email found" });
                    }
                    user.resetToken = token;
                    // @ts-ignore
                    user.resetTokenExpiration = Date.now() + 3600000;

                    await user.save();

                    res.status(200).json({ user: user, message: "Authentication successful" });

                    await transporter.sendMail({
                        to: req.body.email,
                        from: process.env.SENDGRID_EMAIL_PERSONAL,
                        subject: 'Password Reset Details',
                        html: `
                <p>You requested a password reset</p>
                <p>Click this link<a href="http://localhost:3000/reset/${token}"></a> to set a new password</p>`
                    });
                } catch (err) {
                    return res.status(401).json({ error: "Authentication failed. Invalid credentials." });
                }
            };

        });
        res.status(200).json({ message: 'Forgot password request received. Check your email for further instructions.' });
    } catch (error: any) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
export const getPassword = async (req: Request, res: Response) => {
    const token = req.params.token;

    try {
        const user = await User.findOne({ resetToken: token, resetTokenExpiration: { $gt: Date.now() } });

        if (user) {
            // Do something with the user data if needed
            res.status(200).json({ message: 'Token is valid' });
        } else {
            res.status(404).json({ error: 'Invalid or expired reset token' });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Server error' });
    }
};


export const postNewPassword = async (req: Request, res: Response) => {
    try {
        const newPassword = req.body.password;
        const userId = req.body.userId;
        const passwordToken = req.body.passwordToken;

        const resetUser = await User.findOne({
            resetToken: passwordToken,
            resetTokenExpiration: { $gt: Date.now() },
            _id: userId
        }) as IUser;

        if (!resetUser) {
            console.log("Invalid or expired reset token");
            return res.redirect('/api/auth/');
        }
        resetUser.passwordHash = await bcrypt.hash(newPassword, 12);
        await resetUser.save();

        res.redirect('/api/auth/login');
    } catch (err) {
        console.error("Error in postNewPassword:", err);
        return res.status(500).json({ error: "Internal server error" });
    }
};

