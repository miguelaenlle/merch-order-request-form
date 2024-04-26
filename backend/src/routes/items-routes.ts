import express from 'express';
import {body} from "express-validator";
import { createItem, retrieveItems, getSpecificItem, updateItem, deleteItem, getMyItems} from "../controllers/items-controller";
import {auth, authExtended} from '../middleware/auth'


const router = express.Router();

router.post('/', [
    body('name').isString().withMessage('Name must be a string').notEmpty().withMessage('Name is required').isLength({ min: 3, max: 25 }),
    body('description').isString().withMessage('Description must be a string').notEmpty().withMessage('Description is required'),
    body('pickupLocation').isString().withMessage('Pick up location must be a string').notEmpty().withMessage('Pick up location is required'),
    body('pickupTime').isString().withMessage('Pick up time must be a string').notEmpty().withMessage('Pick up time is required'),
    body('price').isNumeric().withMessage('Must list a numerical value').notEmpty().withMessage('Price is required')], auth, authExtended, createItem);
router.get('/', auth, authExtended, retrieveItems);
router.get('/my-items', auth, authExtended, getMyItems);
router.get('/:_id', auth, authExtended, getSpecificItem);
router.put('/:_id', [
    body('newName').isString().withMessage('Name must be a string').notEmpty().withMessage('Name is required').isLength({ min: 3, max: 25 }),
    body('newDescription').isString().withMessage('Description must be a string').notEmpty().withMessage('Description is required'),
    body('newPickupLocation').isString().withMessage('Pick up location must be a string').notEmpty().withMessage('Pick up location is required'),
    body('newPickupTime').isString().withMessage('Pick up time must be a string').notEmpty().withMessage('Pick up time is required')], auth, authExtended, updateItem);
router.delete('/:_id', auth, authExtended, deleteItem);




export default router;

