import { Router } from 'express';
import { loginUser, createUser } from '../controllers/user-controller';
import { body } from 'express-validator';

const router = Router()

router.post('/login',[
    body('email').isEmail().withMessage('Email must be valid').notEmpty().withMessage('Email is required'),
    body('password').isString().withMessage('Password must be string').notEmpty().withMessage('Password is required')
], loginUser)

router.post('/signup',[
    body('name').isString().withMessage('Name must be a string').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Email must be valid').notEmpty().withMessage('Email is required'),
    body('password').isString().withMessage('Password must be string').notEmpty().withMessage('Password is required')
], createUser)

export default router;