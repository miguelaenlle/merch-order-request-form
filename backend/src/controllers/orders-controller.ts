import { Request, Response } from 'express';
import OrderItem, { IOrderItem } from '../models/order-item';
import {validationResult} from "express-validator";
import Order, {IOrder} from "../models/order";
import { ObjectId } from 'mongodb';

export const createOrder = async (req: Request, res: Response): Promise<void> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log("Validation errors", errors);
        res.status(400).json({ errors: errors.array() });
    }
    try {
        const { orderId, itemId, size, numOrdered } = req.body;
        const orderItem: IOrderItem = new OrderItem({
            orderId,
            itemId,
            size,
            numOrdered,
        });
        const savedOrderItem = await orderItem.save();
        res.status(201).json({ orderItem: savedOrderItem });
    } catch (error) {
        console.error('Error creating order item:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
export const getAllOrders = async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log("errors", errors);
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const orders: IOrderItem[] = await OrderItem.find();
        res.status(200).json(orders);
    } catch (error) {
        console.error('Error retrieving orders:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
export const cancelOrder = async (req: Request, res: Response): Promise<void> => {
    try {
        const orderId: string = req.params.id;
        const order: IOrder | null = await Order.findById(orderId);
        if (!order) {
            res.status(404).json({ error: 'Order not found' });
        }

        // Step 2: Update the order's status to "denied" in the database
        await Order.updateOne({ _id: new ObjectId(orderId) }, { $set: { status: 'denied' } });

        // Step 4: Return a confirmation of the order cancellation
        res.status(200).json({ message: 'Order successfully canceled' });
    } catch (error) {
        console.error('Error canceling order:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
export const completeOrder = async (req: Request, res: Response): Promise<void> => {
    try {
        const orderId: string = req.params.id;
        const order: IOrder | null = await Order.findById(orderId);
        if (!order) {
            res.status(404).json({ error: 'Order not found' });
        }
        await Order.updateOne({ _id: new ObjectId(orderId) }, { $set: { status: 'completed' } });
        res.status(200).json({ message: 'Order successfully completed' });
    } catch (error) {
        console.error('Error completing order:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

