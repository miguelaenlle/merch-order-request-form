import {Request, Response} from 'express';
import OrderItem, {IOrderItem} from '../models/order-item';
import {validationResult} from "express-validator";
import Order, {IOrder} from "../models/order";
import {ObjectId} from 'mongodb';
import {createTransport} from 'nodemailer'
import {CustomRequest} from "../middleware/auth";
import User from "../models/user";

const sendgridTransport = require('nodemailer-sendgrid-transport')
const transporter = createTransport(sendgridTransport({
    auth: {
        api_key: process.env.SENDGRID_TOKEN_PERSONAL
    }
}))

export const createOrder = async (req: CustomRequest, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({errors: errors.array()});
        return;
    }
    try {
        if (!req.token?.userId) {
            return res.status(422).json({error: "UserId does not exist"});
        }

        const {itemOwnerId, customerName, customerEmail, customerType, school, notes, orderedItems} = req.body;
        const userWhoPlacedOrderId = req.token.userId;

        const largestOrder = await Order.findOne({itemOwnerId}).sort({orderNumber: -1}).limit(1);
        const newOrderNumber = largestOrder ? largestOrder.orderNumber + 1 : 1;

        const order: IOrder = new Order({
            orderNumber: newOrderNumber,
            itemOwnerId,
            userWhoPlacedOrderId,
            customerName,
            customerEmail,
            customerType,
            school,
            notes
        });
        const savedOrder = await order.save();

        for (const item of orderedItems) {
            const orderItem: IOrderItem = new OrderItem({
                orderId: savedOrder._id,
                itemId: item.itemId,
                size: item.size,
                numOrdered: item.numOrdered,
            });
            await orderItem.save();
        }
        res.status(201).json({order: savedOrder});
    } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).json({error: 'Internal Server Error'});
    }
};

export const getAllOrders = async (req: CustomRequest, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log("errors", errors);
        return res.status(400).json({errors: errors.array()});
    }
    try {
        const orders: IOrder[] = await Order.find();
        res.status(200).json({orders});
    } catch (error) {
        console.error('Error retrieving orders:', error);
        res.status(500).json({error: 'Internal Server Error'});
    }
};
export const cancelOrder = async (req: CustomRequest, res: Response) => {
    try {
        const orderId: string = req.params.id;
        const order: IOrder | null = await Order.findById(orderId);
        if (!order) {
            res.status(404).json({error: 'Order not found'});
        }
        const seller = await User.findById(order?.itemOwnerId);
        if (!seller) {
            return res.status(404).json({error: 'Seller not found'});
        }
        await Order.updateOne({_id: new ObjectId(orderId.trim())}, {$set: {status: 'denied'}});
        await sendEmail(order?.customerEmail, "Customer: Order Canceled", "Your order ${orderId} has been canceled.", `<p>Your order ${orderId} has been canceled.</p>`)
        await sendEmail(seller.email, "Seller: Order Canceled", "Order ${orderId} has been canceled by ${order?.customerEmail}.", `<p>Order ${orderId} has been canceled.</p>`)
        res.status(200).json({message: 'Order successfully canceled'});
    } catch (error) {
        console.error('Error canceling order:', error);
        res.status(500).json({error: 'Internal Server Error'});
    }
};
export const completeOrder = async (req: CustomRequest, res: Response) => {
    try {
        const orderId: string = req.params.id;
        const order: IOrder | null = await Order.findById(orderId);
        if (!order) {
            res.status(404).json({error: 'Order not found'});
        }
        const seller = await User.findById(order?.itemOwnerId);
        if (!seller) {
            return res.status(404).json({error: 'Seller not found'});
        }
        await Order.updateOne({_id: new ObjectId(orderId.trim())}, {$set: {status: 'completed'}});
        await sendEmail(order?.customerEmail, "Customer: Order Completed", "Your order ${orderId} has been completed.", `<p>Your order ${orderId} has been completed.</p>`)
        await sendEmail(seller.email, "Seller: Order Completed", "Order ${orderId} has been completed by ${order?.customerEmail}.", `<p>Order ${orderId} has been completed.</p>`)
        res.status(200).json({message: 'Order successfully completed'});
    } catch (error) {
        console.error('Error completing the order:', error);
        res.status(500).json({error: 'Internal Server Error'});
    }
};
export const updateOrder = async (req: CustomRequest, res: Response) => {
    const {
        newOrderNumber,
        newCustomerName,
        newCustomerEmail,
        newCustomerType,
        newSchool,
        newNotes
    }: {
        newOrderNumber: number,
        newCustomerName: string,
        newCustomerEmail: string,
        newCustomerType: string,
        newSchool: string,
        newNotes: string
    } = req.body;
    const orderId: string = req.params.id;
    const user = await User.findOne(req.token?.userId);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    if (!req.token?.userId || (user?.group !== 'buyer' && user?.group !== 'seller')) {
        return res.status(403).json({ error: 'Invalid or missing user type' });
    }
    const order: IOrder | null = await Order.findById(orderId);
    if (!order) {
        return res.status(404).json({ error: 'Order not found' });
    }
    if (user?.group === 'buyer' && req.token.userId !== order.itemOwnerId.toString()) {
        return res.status(403).json({ error: 'Unauthorized access' });
    }
    if (user?.group === 'seller' && req.token.userId !== order.itemOwnerId.toString() && req.token.userId !== order.userWhoPlacedOrderId.toString()) {
        return res.status(403).json({ error: 'Unauthorized access' });
    }
    try {
        const result = await Order.updateOne({ _id: new ObjectId(orderId) }, {
            orderNumber: newOrderNumber,
            customerName: newCustomerName,
            customerEmail: newCustomerEmail,
            customerType: newCustomerType,
            school: newSchool,
            notes: newNotes
        });
        if(result.matchedCount === 0){
            return res.status(404).json({error: 'Order not found'});
        }
        const updatedOrder = await Order.findOne({_id: new ObjectId(orderId)});
        return res.status(200).json({updatedOrder});
    } catch (error) {
        console.error('Error updating the order:', error);
        res.status(500).json({error: 'Internal Server Error'});
    }
};
const sendEmail = async (email: string | undefined, subject: string, text: string, html: string) => {
    try {
        await transporter.sendMail({
            to: email,
            from: process.env.SENDGRID_EMAIL_PERSONAL,
            subject: subject,
            text: text,
            html: html
        });
        console.log('Email sent to successfully');
    } catch (error) {
        console.error('Error sending email', error);
    }
};

