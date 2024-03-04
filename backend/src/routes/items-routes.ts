import express from 'express';
import {body} from "express-validator";
import { createItem, retrieveItems, getSpecificItem, updateItem, deleteItem} from "../controllers/items-controller";

const router = express.Router();

router.post('/', [
    body('name').isString().withMessage('Name must be a string').notEmpty().withMessage('Name is required').isLength({ min: 3, max: 25 }),
    body('description').isString().withMessage('Description must be a string').notEmpty().withMessage('Description is required'),
    body('pickupLocation').isString().withMessage('Pick up location must be a string').notEmpty().withMessage('Pick up location is required'),
    body('pickupTime').isString().withMessage('Pick up time must be a string').notEmpty().withMessage('Pick up time is required')], createItem);
router.get('/', retrieveItems);
router.get('/:_id', getSpecificItem);
router.put('/:_id', [
    body('newName').isString().withMessage('Name must be a string').notEmpty().withMessage('Name is required').isLength({ min: 3, max: 25 }),
    body('description').isString().withMessage('Description must be a string').notEmpty().withMessage('Description is required'),
    body('pickupLocation').isString().withMessage('Pick up location must be a string').notEmpty().withMessage('Pick up location is required'),
    body('pickupTime').isString().withMessage('Pick up time must be a string').notEmpty().withMessage('Pick up time is required')], updateItem);
router.delete('/:_id', deleteItem);


export default router;

