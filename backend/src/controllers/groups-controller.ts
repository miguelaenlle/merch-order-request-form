import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { ObjectId } from "mongodb";
import { CustomRequest } from "../middleware/auth";
import Group from "../models/group";
import getFirstError from '../helpers/get-first-error';






//Creates a group with the desired name and gives a unique ID
export const createGroup = async (req: CustomRequest, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log("errors", errors);
        return res.status(400).json({ message: getFirstError(errors.array()) });
    }
    //Checks if there's a similar group
    const dupeGroup = await Group.findOne({ name: req.body.name })
    if (dupeGroup !== null) {
        return res.status(409).json({ message: "A group with the same name already exists." });
    }
    //Checks if UserId exists
    if (!req.token?.userId) { // this is an incomplete implementation of the token feature. it doesn't even check if the token is of the correct type. dhruv please fix.
        return res.status(422).json({ message: "UserId does not exist" });
    }

    else {
        //Creates a new group with name and id
        try {
            const name = req.body.name as string;
            const group = new Group({
                name: name,
                userId: req.token.userId
            });
            await group.save();
            return res.status(201).json({ group });
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }
}

//Returns the existing groups
export const retrieveGroups = async (req: CustomRequest, res: Response) => {
    if (!req.token) {
        res.status(400).json({ message: 'Token missing' });
        return
    }

    try {
        const groups = await Group.find({ userId: req.token.userId });
        return res.status(200).json(groups);
    } catch (error: any) {
        return res.status(500).json({ message: error.message });
    }
}

//Find specific group by ID
export const getSpecificGroup = async (req: Request, res: Response) => {
    try {
        const groupID: string = req.params._id;
        const desiredGroup = await Group.findOne({ _id: groupID });
        if (desiredGroup) {
            return res.status(200).json(desiredGroup);
        }
        else {
            return res.status(404).json({ message: "No group with the provided ID exists" });
        }
    } catch (error: any) {
        return res.status(500).json({ message: error.message });
    }
}

//Updates the name of an existing group
export const updateName = async (req: CustomRequest, res: Response) => {
    const { newName }: { newName: string } = req.body;
    const groupID: string = req.params._id;

    //Validation error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log("errors", errors);
        return res.status(400).json({ message: getFirstError(errors.array()) });
    }
    //Group existence error
    const existingGroup = await Group.findOne({ name: newName })
    if (existingGroup !== null) {
        return res.status(409).json({ message: "This group name is already taken" });
    }
    //Checks if UserId exists
    if (!req.token?.userId) {
        return res.status(422).json({ message: "UserId does not exist" });
    }
    const findGroupOwnerById = await Group.findOne({ userId: req.token.userId, _id: groupID });
    //Makes sure user is owner of the item
    if (!findGroupOwnerById) {
        return res.status(403).json({ message: 'The user id does not match.' });
    }
    //Token check
    if (!req.token) {
        return res.status(400).json({ message: 'Token missing' })
    }
    //Updates group
    try {
        const result = await Group.updateOne({ _id: new ObjectId(groupID) }, { $set: { name: newName } });
        if (result.matchedCount === 0) {
            return res.status(404).json({ message: 'The desired group was not found' });
        }
        const updatedGroup = await Group.findOne({ _id: new ObjectId(groupID) });
        return res.status(200).json(updatedGroup);
    }
    catch (error: any) {
        res.status(500).json({ message: error.message });
    }
}

//Deletes group by ID
export const deleteGroup = async (req: CustomRequest, res: Response) => {
    const groupID: string = req.params._id;
    //Checks if UserId exists
    if (!req.token?.userId) {
        return res.status(422).json({ message: "UserId does not exist" });
    }
    const findGroupOwnerById = await Group.findOne({ userId: req.token.userId, _id: groupID });
    //Makes sure user is owner of the item
    if (!findGroupOwnerById) {
        return res.status(403).json({ message: 'The user id does not match.' });
    }
    //Token check
    if (!req.token) {
        return res.status(400).json({ message: 'Token missing' })
    }
    try {
        const result = await Group.deleteOne({ _id: new ObjectId(groupID) });
        if (result.deletedCount === 0) {
            return res.status(404).json({ message: 'The desired group was not found' });
        }
        return res.status(200).json({ message: 'The group was successfully deleted' })
    }
    catch (error: any) {
        res.status(500).json({ message: error.message });
    }
}
