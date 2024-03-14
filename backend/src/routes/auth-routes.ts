import { Router } from 'express';
import {loginUser, createUser, confirmEmail, resendConfirmationEmail, postReset, getPassword, postNewPassword} from '../controllers/auth-controller';
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

router.post('/confirm-email',[
    body('email').isEmail().withMessage('Email must be valid').notEmpty().withMessage('Email is required'),
    body('confirmationCode').isString().withMessage('Code must be string').notEmpty().withMessage('Code is required')
], confirmEmail)

router.post('/resend-confirmation-email',[
    body('email').isEmail().withMessage('Email must be valid').notEmpty().withMessage('Email is required')
], resendConfirmationEmail)

router.post('/reset', [
    body('email').isEmail().withMessage('Email must be valid').notEmpty().withMessage('Email is required')
], postReset);

router.post('/new-password', [
    body('email').isEmail().withMessage('Email must be valid').notEmpty().withMessage('Email is required'),
    body('password').isString().withMessage('Password must be valid').notEmpty().withMessage('Password is required'),
    body('passwordToken').isString().withMessage('Password token must be valid').notEmpty().withMessage('Password token is required')
], postNewPassword);

export default router;