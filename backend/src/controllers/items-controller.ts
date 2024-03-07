import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import Item from '../models/item';
import User from '../models/user'
import InventoryItem from "../models/inventory-item";
import mongoose from 'mongoose';
import {ObjectId} from "mongodb";

//Creates an item
export const createItem = async (req: Request, res: Response) => {
    //Validation check
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log("errors", errors);
        return res.status(400).json({errors: errors.array()});
    }
    //Duplicated item check
    const dupeItem = Item.findOne({name: req.body.name})
    if (!dupeItem) {
        return res.status(409).json({error: "An item with the same name already exists."});
    }
    //Checks if the ID matches the owner of the item
    const itemOwnerId = req.params._id;
    const itemOwnerExistence = User.findOne({_id: itemOwnerId});
    if (!itemOwnerExistence) {
        return res.status(404).json({error: "This id does not match the owner of the item."});
    }
    const name = req.body.name as string;
    const description = req.body.description as string;
    const pickupLocation = req.body.pickupLocation as string;
    const pickupTime = req.body.pickupTime as string;



    //Interface for a new item
    const item = new Item({
        name: name,
        description: description,
        pickupLocation: pickupLocation,
        pickupTime: pickupTime,
        itemOwnerId: itemOwnerId
    });
    //Creates a transaction to create inventory-items
    //Checks if there's missing sizes
    const transaction = await mongoose.startSession();
    transaction.startTransaction();
    try {
        const savedItem = await item.save();
        const sizeList = ['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL'];
        for (const size of sizeList) {
            const invItem = new InventoryItem({
                size: size,
                item: savedItem._id
            });
            await invItem.save({session: transaction});
        }
        await transaction.commitTransaction();
        await transaction.endSession();
        return res.status(201).json({item});
    } catch (error: any) {
        await transaction.abortTransaction();
        await transaction.endSession();
        return res.status(500).json({message: 'Server error', error: error.message});
    }
}


//Retrieves a list of all items
export const retrieveItems = async (req: Request, res: Response) => {
    try {
        const items = await Item.find();
        return res.status(200).json(items);
    } catch (error: any) {
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
}

//Retrieves details of a specific item
export const getSpecificItem = async (req: Request, res: Response) => {
    try {
        const itemID: string = req.params._id;
        const desiredItem = await Item.findOne({ _id: itemID });
        if (desiredItem){
            return res.status(200).json(desiredItem);
        }
        else{
            return res.status(404).json({ error: "No item with the provided ID exists"});
        }
    } catch (error: any){
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
}

//Updates a specific item
export const updateItem = async (req: Request, res: Response) => {
    const { newName }: { newName: string }= req.body;
    const { newDescription }: { newDescription: string }= req.body;
    const { newPickupLocation }: { newPickupLocation: string }= req.body;
    const { newPickupTime }: { newPickupTime: string }= req.body;
    const itemID: string = req.params._id;

    //Validation error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log("errors", errors);
        return res.status(400).json({ errors: errors.array() });
    }
    //Updates item
    try {
        const result = await Item.updateOne({_id: new ObjectId(itemID)},
            {$set: { name: newName, description: newDescription, pickupLocation: newPickupLocation, pickupTime: newPickupTime}});
        if(result.matchedCount === 0){
            return res.status(404).json({ error: 'The desired item was not found'});
        }
        const updatedItem = await Item.findOne({ _id: new ObjectId(itemID)});
        return res.status(200).json(updatedItem);
    }
    catch (error: any) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

//Deletes a specific item
export const deleteItem = async (req: Request, res: Response) => {
    const itemID: string = req.params._id;
    try {
        const result = await Item.deleteOne({_id: new ObjectId(itemID)});
        if(result.deletedCount === 0){
            return res.status(404).json({ error: 'The desired item was not found'});
        }
        return res.status(200).json({ message: 'The item was successfully deleted'})
    }
    catch (error: any) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}