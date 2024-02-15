import {Request, response, Response} from 'express';
import User from '../models/user';
import { hash, compare } from 'bcrypt'
import { validationResult } from 'express-validator';
import Dummy from "../models/dummy";

const saltRounds = 10 //for when a user signs up

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
                // @ts-ignore
                compare(req.body.password, user.passwordHash/*forgot how to fix possibly null*/).then(result => {
                    console.log(result) // for now
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