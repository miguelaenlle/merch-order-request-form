import express from 'express';
import {getAllOrders, cancelOrder, completeOrder, createOrder, updateOrder} from '../controllers/orders-controller';
import {body} from "express-validator";
import {auth} from "../middleware/auth";

const router = express.Router();

router.get('/', auth, getAllOrders);

router.post('/', [
    body('customerName').notEmpty().withMessage('Customer name is required'),
    body('customerEmail').isEmail().withMessage('Invalid email address'),
    body('customerType').notEmpty().withMessage('Customer type is required'),
    body('orderedItems').isArray({ min: 1 }).withMessage('At least one item is required in orderedItems'),
], auth, createOrder);

router.post('/:id/cancel', auth, cancelOrder);

router.post('/:id/complete', auth, completeOrder);

router.put('/:id/update',[
    body('newCustomerName').notEmpty().withMessage('Customer name is required'),
    body('newCustomerEmail').isEmail().withMessage('Invalid email address'),
    body('newCustomerType').notEmpty().withMessage('Customer type is required'),
], auth, updateOrder);

export default router;