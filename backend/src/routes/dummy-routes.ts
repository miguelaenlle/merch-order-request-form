import { Router } from 'express';
import { createDummy, getDummies } from '../controllers/dummy-controller';
import { body } from 'express-validator';

const router = Router();

router.post('/', [
    body('name').isString().withMessage('Name must be a string').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Email must be valid').notEmpty().withMessage('Email is required'),
], createDummy);

router.get('/', getDummies);

export default router;

