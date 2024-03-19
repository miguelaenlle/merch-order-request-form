import express from 'express';
import {getAllOrders, cancelOrder, completeOrder, createOrder} from '../controllers/orders-controller';
import {body} from "express-validator";

const router = express.Router();

router.get('/', getAllOrders);

router.post('/', [
    body('customerName').notEmpty().withMessage('Customer name is required'),
    body('customerEmail').isEmail().withMessage('Invalid email address'),
    body('customerType').notEmpty().withMessage('Customer type is required'),
    body('orderedItems').isArray({ min: 1 }).withMessage('At least one item is required in orderedItems'),
], createOrder);

router.post('/:id/cancel', cancelOrder);

router.post('/:id/complete', completeOrder);

export default router;