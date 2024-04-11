import express from 'express';
import {getAllOrders, cancelOrder, completeOrder, createOrder, getMyOrders} from '../controllers/orders-controller';
import {body} from "express-validator";
import {auth} from "../middleware/auth";
import {createItem} from "../controllers/items-controller";

const router = express.Router();

router.get('/', getAllOrders);
router.get('/my-orders', auth, getMyOrders);

router.post('/', [
    body('customerName').notEmpty().withMessage('Customer name is required'),
    body('customerEmail').isEmail().withMessage('Invalid email address'),
    body('customerType').notEmpty().withMessage('Customer type is required'),
    body('orderedItems').isArray({ min: 1 }).withMessage('At least one item is required in orderedItems'),
], auth, createOrder);

router.post('/:id/cancel', cancelOrder);

router.post('/:id/complete', completeOrder);

export default router;