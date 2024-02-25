import {Request, Response} from 'express';
import User from '../models/user';
import bcrypt, {compare, hash} from 'bcrypt';
import { validationResult } from 'express-validator';
import crypto from 'crypto';
import nodemailer from "nodemailer";
import nodemailerSendgrid from "nodemailer-sendgrid";

const saltRounds = 10 //for when a user signs up
const transporter = nodemailer.createTransport(nodemailerSendgrid({
    apiKey: "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"
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
           // @ts-ignore
            User.findOne({email: req.body.email}).then(user => {
               if(!user){
                   console.log(err + ": No account with that email found");
                   return res.redirect('/api/auth/');
               }
               user.resetToken = token;
               // @ts-ignore
               user.resetTokenExpiration = Date.now() + 3600000;
               return user.save();
           }).then(() => {
               res.redirect('api/auth/login')
               transporter.sendMail({
                  to: req.body.email,
                  from: 'arslankamcybekov7@gmail.com',
                   subject: 'Password Reset Details',
                   html: `
                     <p>You requested a password reset</p>
                     <p>Click this link <a> href="http://localhost:3000/reset/${token}">link</a> to set a new password</p>
                   `
               });
           }).catch(err => {
               console.log(err);
           });
        });
        res.status(200).json({ message: 'Forgot password request received. Check your email for further instructions.' });
    } catch (error: any) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
export const getPassword = async (req: Request, res: Response) => {
    const token  = req.params.token;
    User.findOne({resetToken: token, resetTokenExpiration: {$gt: Date.now()}}).then(user =>{
        res.render('auth/new-password',
            {
                path: '/new-password',
                pageTitle: 'New Password',
                userId: user?._id.toString(),
                passwordToken: token
            });
    }).catch( err => {
        console.log(err);
    });
};

export const postNewPassword = async (req: Request, res: Response) => {
    const newPassword = req.body.password;
    const userId = req.body.userId;
    const passwordToken = req.body.passwordToken;
    let resetUser;
    User.findOne({resetToken: passwordToken, resetTokenExpiration: {$gt: Date.now()}, _id: userId})
        .then(user => {
        resetUser = user;
        return bcrypt.hash(newPassword, 12);
    })
        .then(hashedPassword => {
        resetUser.password = hashedPassword;
        resetUser.token = undefined;
        resetUser.resetTokenExpiration = undefined;
        return resetUser.save();
    })
        .then(() => {
        res.redirect('/api/auth/login');
    })
        .catch(err => {
        console.log(err);
    });
};