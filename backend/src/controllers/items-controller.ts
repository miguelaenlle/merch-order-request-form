import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import Item, { IItem } from '../models/item';
import InventoryItem from "../models/inventory-item";
import mongoose from 'mongoose';
import { ObjectId } from "mongodb";
import { CustomRequest } from "../middleware/auth";
import Group from '../models/group';
import getFirstError from '../helpers/get-first-error';
import path from "path";
import fs from "fs";

//Creates an item
export const createItem = async (req: CustomRequest, res: Response) => {
    //Validation check
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log("errors", errors);
        return res.status(400).json({ message: getFirstError(errors.array()) });
    }

    //Duplicated item check
    const dupeItem = Item.findOne({ name: req.body.name })
    if (!dupeItem) {
        return res.status(409).json({ message: "An item with the same name already exists." });
    }
    //Group existence check
    if (req.body.groupId) {
        const groupExistence = await Group.exists({ _id: req.body.groupId });
        if (!groupExistence) {
            return res.status(404).json({ message: "No group with the provided ID exists" });
        }
    }
    const name = req.body.name as string;
    const description = req.body.description as string;
    const pickupLocation = req.body.pickupLocation as string;
    const pickupTime = req.body.pickupTime as string;

    //Checks if UserId exists
    if (!req.token?.userId) {
        return res.status(422).json({ message: "UserId does not exist" });
    }
    //Interface for a new item
    const item = new Item({
        name: name,
        description: description,
        pickupLocation: pickupLocation,
        pickupTime: pickupTime,
        itemOwnerId: req.token.userId,
        groupId: req.body.groupId
    });
    //Creates a transaction to create inventory-items
    //Checks if there's missing sizes
    const transaction = await mongoose.startSession();
    transaction.startTransaction();
    try {
        const savedItem = await item.save();
        const sizeList = ['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL'];

        const inventoryItemData = req.body.inventoryItemData // {[key: string]: {amount: number, price: number}}, key is size

        for (const size of sizeList) {
            const invItem = new InventoryItem({
                size: size,
                itemId: savedItem._id,
                amount: inventoryItemData[size]?.amount ?? 0,
                price: inventoryItemData[size]?.price ?? 0

            });
            await invItem.save({ session: transaction });
        }
        await transaction.commitTransaction();
        await transaction.endSession();
        return res.status(201).json({ item });
    } catch (error: any) {
        await transaction.abortTransaction();
        await transaction.endSession();
        console.log(error)
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
}

//Retrieves a list of all items
export const retrieveItems = async (req: CustomRequest, res: Response) => {
    try {
        //Checks if token is missing
        if (!req.token) {
            return res.status(400).json({ message: 'Token missing' })
        }
        //Group existence check
        if (req.body.groupId) {
            const groupExistence = await Group.exists({ _id: req.body.groupId });
            if (!groupExistence) {
                return res.status(404).json({ message: "No group with the provided ID exists" });
            }
        }
        const filter: any = {};
        const groupId = req.query.groupId as string;
        if (groupId) {
            filter.groupId = groupId;
        }
        const items = await Item.find(filter);
        return res.status(200).json({ items });
    } catch (error: any) {
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
}

//Retrieves details of a specific item
export const getSpecificItem = async (req: Request, res: Response) => {
    try {
        const itemID: string = req.params._id;
        const desiredItem = await Item.findOne({ _id: itemID });
        if (desiredItem) {
            return res.status(200).json({ item: desiredItem });
        }
        else {
            return res.status(404).json({ message: "No item with the provided ID exists" });
        }
    } catch (error: any) {
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
}

//Updates a specific item
export const updateItem = async (req: CustomRequest, res: Response) => {
    const { newName }: { newName: string } = req.body;
    const { newDescription }: { newDescription: string } = req.body;
    const { newPickupLocation }: { newPickupLocation: string } = req.body;
    const { newPickupTime }: { newPickupTime: string } = req.body;
    const groupID = req.body.groupId;
    const itemID: string = req.params._id;
    //Checks if UserId exists
    if (!req.token?.userId) {
        return res.status(422).json({ message: "UserId does not exist" });
    }
    //Group existence check
    if (req.body.groupId) {
        const groupExistence = await Group.exists({ _id: req.body.groupId });
        if (!groupExistence) {
            return res.status(404).json({ message: "No group with the provided ID exists" });
        }
    }
    const itemOwner = req.body.itemOwnerId;
    const findItemOwnerById = Item.find({ itemOwnerId: itemOwner });
    //Makes sure user is owner of the item
    if (!findItemOwnerById) {
        return res.status(403).json({ message: 'The user id does not match.' });
    }
    //Token check
    if (!req.token) {
        return res.status(400).json({ message: 'Token missing' })
    }
    //Validation error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log("errors", errors);
        return res.status(400).json({ message: getFirstError(errors.array()) });
    }
    //Updates item
    try {
        const result = await Item.updateOne({ _id: new ObjectId(itemID) },
            { name: newName, description: newDescription, pickupLocation: newPickupLocation, pickupTime: newPickupTime, groupId: groupID });
        if (result.matchedCount === 0) {
            return res.status(404).json({ message: 'The desired item was not found' });
        }
        const updatedItem = await Item.findOne({ _id: new ObjectId(itemID) });
        return res.status(200).json({ updatedItem });
    }
    catch (error: any) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}


//Deletes a specific item
export const deleteItem = async (req: CustomRequest, res: Response) => {
    const itemID: string = req.params._id;
    //Checks if UserId exists
    if (!req.token?.userId) {
        return res.status(422).json({ message: "UserId does not exist" });
    }
    const itemOwner = req.body.itemOwnerId;
    const findItemOwnerById = Item.find({ itemOwnerId: itemOwner });
    //Makes sure user is owner of the item
    if (!findItemOwnerById) {
        return res.status(403).json({ message: 'The user id does not match.' });
    }
    //Token check
    if (!req.token) {
        return res.status(400).json({ message: 'Token missing' })
    }
    try {
        const result = await Item.deleteOne({ _id: new ObjectId(itemID) });
        if (result.deletedCount === 0) {
            return res.status(404).json({ message: 'The desired item was not found' });
        }
        return res.status(200).json({ message: 'The item was successfully deleted' })
    }
    catch (error: any) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

export const getMyItems = async (req: CustomRequest, res: Response) => {
    //Checks if UserId exists
    if (!req.token?.userId) {
        return res.status(422).json({ message: "UserId does not exist" });
    }
    //Token check
    if (!req.token) {
        return res.status(400).json({ message: 'Token missing' })
    }
    try {
        const items = await Item.find({ itemOwnerId: req.token.userId });
        const itemList = await Promise.all(items.map(async item => {
            const invItem = await InventoryItem.findOne({ itemId: item._id, price: { $gt: 0 } })
            const price = invItem ? invItem.price : 0;
            const group = await Group.findById(item.groupId);
            return {
                _id: item._id,
                name: item.name,
                description: item.description,
                price,
                pickupLocation: item.pickupLocation,
                pickupTime: item.pickupTime,
                groupId: item.groupId,
                groupIdName: group ? group.name : 'Unknown Group',
                filename: item.filename
            }
        }));
        return res.status(200).json(itemList);

    } catch (error: any) {
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
}

export const uploadImage = async (request: Request, response: Response) => {
    const file = request.file;
    if (!file) {
        return response.status(400).send({ message: "Please upload a file." });
    }

    try {
        await Item.updateOne({ _id: new ObjectId(request.params._id) }, { filename: file.filename, path: file.path });
    } catch (error: any) {
        response.status(500).send({
            message: "Could not upload the file."
        });
    }

    response.status(200).send({
        message: "File uploaded successfully",
        data: file,
    });
}

export const displayImage = async (request: Request, response: Response) => {

    try {
        const item: IItem | null = await Item.findOne({ _id: new ObjectId(request.params._id) });
        if (!item) {
            return response.status(404).send('Item not found.');
        }
        if (!item.filename) {
            return response.status(404).send('Image not found.')
        }
        const filePath = path.join(__dirname, '../../uploads', item.filename);
        console.log("Filepath", filePath);
        if (fs.existsSync(filePath)) {
            response.sendFile(filePath);
        } else {


            response.status(404).send('File not found.');
        }

    } catch {
        response.status(500).send('Server error.');
    }

}