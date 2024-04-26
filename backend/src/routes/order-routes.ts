import express from 'express';
import { getAllOrders, cancelOrder, completeOrder, createOrder, updateOrder, getMyOrders, getOrderItemsOfOrder } from '../controllers/orders-controller';

import { body } from "express-validator";
import {auth, authExtended} from "../middleware/auth";

const router = express.Router();

router.get('/', auth, authExtended, getAllOrders);
router.get('/my-orders', auth, authExtended, getMyOrders);

router.post('/', [
    body('customerName').notEmpty().withMessage('Customer name is required'),
    body('customerEmail').isEmail().withMessage('Invalid email address'),
    body('customerType').notEmpty().withMessage('Customer type is required'),
    body('orderedItems').isArray({ min: 1 }).withMessage('At least one item is required in orderedItems'),
], auth, authExtended, createOrder);

router.get('/:id/order-items', auth, authExtended, getOrderItemsOfOrder);

router.post('/:id/cancel', auth, authExtended, cancelOrder);

router.post('/:id/complete', auth, authExtended, completeOrder);

router.put('/:id/update', [
    body('newCustomerName').notEmpty().withMessage('Customer name is required'),
    body('newCustomerEmail').isEmail().withMessage('Invalid email address'),
    body('newCustomerType').notEmpty().withMessage('Customer type is required'),
], auth, authExtended, updateOrder);

export default router;