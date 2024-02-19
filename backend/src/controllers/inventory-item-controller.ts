import { Request, Response } from 'express';
import Dummy from '../models/dummy';
import { validationResult } from 'express-validator';
import mongoose from 'mongoose';
import Item from '../models/item';
import InventoryItem from '../models/inventory-item';

export const createInventoryItem = async (req: Request, res: Response) => {
    // Check for validation errors 
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log("errors", errors);
        return res.status(400).json({ errors: errors.array() });
    }

    function isEmpty(arg: any){
        return (arg === undefined || arg == null || arg.length <= 0) ? (
            res.status(500).json({ message: "Invalid Credentials" }) 
        ) : false;
    }

    try {
        const itemId = req.body.itemId as string;
        const size = req.body.size as string;
        const amount = req.body.amount as number;
        const price = req.body.price as number;

        const list = [size, amount, price]
        for (let i = 0; i < list.length; i++) {
            isEmpty(list[i])
        }
        
        const isIdValid = mongoose.Types.ObjectId.isValid(itemId)

        if (!isIdValid || size == null || size == "" || amount == null || price == null) {
            return res.status(500).json({ message: "Invalid Credentials" }) 
        }

        const findItem = await Item.findOne({ _id: itemId }).catch(err => { 
            return res.status(500).json({ message: "Server Error", error: err.message }) 
        })  

        if (!findItem) {
            return res.status(404).json({ message: "Item Not Found" })
        }

        const inventoryItem = new InventoryItem({
            itemId,
            size,
            amount,
            price
        });

        inventoryItem.save();
        return res.status(201).json(inventoryItem);
    } catch (error: any) {
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
};

export const getInventoryItems = async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log("errors", errors);
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const inventoryItems = await InventoryItem.find().catch(err => { 
            return res.status(500).json({ message: "Server Error", error: err.message }) 
        });
        res.status(200).json(inventoryItems);
    } catch (error: any) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

export const getIndividualInventoryItem = async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log("errors", errors);
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const inventoryItemId = req.params.inventoryItemId as string

        const isIdValid = mongoose.Types.ObjectId.isValid(inventoryItemId)

        if (!isIdValid) {
            return res.status(500).json({ message: "Invalid Credentials" }) 
        }

        const inventoryItems = await InventoryItem.findOne({ _id: inventoryItemId });

        if (!inventoryItems) {
            return res.status(500).json({ message: "Item Not Found" }) 
        }

        res.status(200).json(inventoryItems);
    } catch (error: any) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

export const patchInventoryItem = async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log("errors", errors);
        return res.status(400).json({ errors: errors.array() });
    }

    function isEmpty(arg: any){
        return (arg === undefined || arg == null || arg.length <= 0) ? (
            res.status(500).json({ message: "Invalid Credentials" }) 
        ) : false;
    }

    try {
        const inventoryItemId = req.params.inventoryItemId as string;
        const updatedInventoryItems = req.body.updatedInventoryItems;

        const isIdValid = mongoose.Types.ObjectId.isValid(inventoryItemId)

        const list = [updatedInventoryItems.size, updatedInventoryItems.amount, updatedInventoryItems.price]
        for (let i = 0; i < list.length; i++) {
            isEmpty(list[i])
        }

        if (!isIdValid || updatedInventoryItems == null) {
            return res.status(500).json({ message: "Invalid Credentials" }) 
        }

        const newItems = {
            size: updatedInventoryItems.size,
            amount: updatedInventoryItems.amount,
            price: updatedInventoryItems.price
        }

        const findInventoryItem = await InventoryItem.findOneAndUpdate({ _id: inventoryItemId }, newItems).catch(err => { 
            return res.status(500).json({ message: "Server Error", error: err.message }) 
        })  

        res.status(200).json(findInventoryItem);
    } catch (error: any) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}