import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import mongoose from 'mongoose';
import Item from '../models/item';
import InventoryItem from '../models/inventory-item';
import { CustomRequest } from '../middleware/auth';

export const createInventoryItem = async (req: CustomRequest, res: Response) => {
    // Check for validation errors 
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log("errors", errors);
        return res.status(422).json({ errors: errors.array() });
    } 

    try {
        const itemId = req.body.itemId as string;
        const size = req.body.size as string;
        const amount = req.body.amount as number;
        const price = req.body.price as number;  
        
        const isIdValid = mongoose.Types.ObjectId.isValid(itemId)

        if (!isIdValid) {
            return res.status(500).json({ message: "Invalid Credentials" }) 
        }

        const findItem = await Item.findOne({ _id: itemId }) 

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
        return res.status(201).json({ inventoryItem });
    } catch (error: any) {
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
};

export const getInventoryItems = async (req: CustomRequest, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log("errors", errors);
        return res.status(422).json({ errors: errors.array() });
    }

    try {
        const inventoryItems = await InventoryItem.find() 
        res.status(200).json(inventoryItems);
    } catch (error: any) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

export const getIndividualInventoryItem = async (req: CustomRequest, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log("errors", errors);
        return res.status(422).json({ errors: errors.array() });
    }

    try {
        const inventoryItemId = req.params.inventoryItemId as string

        const isIdValid = mongoose.Types.ObjectId.isValid(inventoryItemId)

        if (!isIdValid) {
            return res.status(500).json({ message: "Invalid Credentials" }) 
        }

        const inventoryItems = await InventoryItem.findOne({ _id: inventoryItemId });

        if (!inventoryItems) {
            return res.status(404).json({ message: "Item Not Found" }) 
        }

        res.status(200).json(inventoryItems);
    } catch (error: any) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

interface ListItem {
    inventoryItemId: string;
    changeInInventory: number;
    newPrice: number;
}

export const patchInventoryItem = async (req: CustomRequest, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log("errors", errors);
        return res.status(422).json({ errors: errors.array() });
    } 

    try {
        const itemId = req.query.itemId as string;
        const updatedInventoryItems = req.body.updatedInventoryItems as ListItem[];

        const isIdValid = mongoose.Types.ObjectId.isValid(itemId)   

        if (!isIdValid || updatedInventoryItems == null) {
            return res.status(500).json({ message: "Invalid Credentials" }) 
        } 

        const items = await Item.findById({ _id: itemId })
        const inventoryItems = await InventoryItem.find({ itemId: itemId })

        if (!items || !inventoryItems) {
            return res.status(404).json({ message: "Item Not Found" })
        }

        for (const item of updatedInventoryItems) {
            const isInventoryItemIdValid = mongoose.Types.ObjectId.isValid(item.inventoryItemId)  
            if (!isInventoryItemIdValid) {
                return res.status(500).json({ message: "Invalid Credentials" }) 
            } 
            const newItem = {
                amount: item.changeInInventory,
                price: item.newPrice
            }
            const findAndUpdateInventoryItems = await InventoryItem.findByIdAndUpdate(item.inventoryItemId, newItem, {
                new: true,
                upsert: true
            })
            if (!findAndUpdateInventoryItems) {
                return res.status(404).json({ message: "Inventory Item Not Found" }) 
            } 
            
        }

        const updatedDetails = {
            itemId,
            updatedInventoryItems
        }

        res.status(200).json({ message: updatedDetails });
    } catch (error: any) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}