import {Request, Router} from 'express';
import {createDummy, dummyTokenTest, getDummies} from '../controllers/dummy-controller';
import { body } from 'express-validator';
import {auth, authExtended} from '../middleware/auth'
import {CustomRequest} from "../middleware/auth";

const router = Router();

router.post('/', [
    body('name').isString().withMessage('Name must be a string').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Email must be valid').notEmpty().withMessage('Email is required'),
], createDummy);

router.post('/token', auth, authExtended, dummyTokenTest);

router.get('/', getDummies);

export default router;

