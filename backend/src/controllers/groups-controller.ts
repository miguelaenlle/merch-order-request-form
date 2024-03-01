import { Request, Response } from 'express';
import Group from '../models/group';
import { validationResult } from 'express-validator';
import group from "../models/group";
import { ObjectId } from "mongodb";





//Creates a group with the desired name and gives a unique ID
export const createGroup = async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log("errors", errors);
        return res.status(400).json({ errors: errors.array() });
    }
    //Checks if there's a similar group
    const dupeGroup = group.findOne({ name: req.body })
    if (!dupeGroup) {
        return res.status(409).json({ error: "A group with the same name already exists."  });
    }
    else{
        //Creates a new group with name and id
        try {
            const name = req.body.name as string;

            const group = new Group({
                name: name,
            });
            await group.save();
            return res.status(201).json({group});
        } catch (error: any) {
            res.status(500).json({ message: 'Server error', error: error.message });
        }
    }
}

//Returns the existing groups
export const retrieveGroups = async (req: Request, res: Response) => {
    try {
        const groups = await Group.find();
        return res.status(200).json(groups);
    } catch (error: any) {
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
}

//Find specific group by ID
export const getSpecificGroup = async (req: Request, res:Response) => {
    const groupID: string = req.params._id;
    const desiredGroup = Group.findOne({ _id: groupID })

    if (desiredGroup){
        return res.status(200).json(desiredGroup);
    }
    else{
        return res.status(404).json({ error: "No group with the provided ID exists"});
    }
}

//Updates the name of an existing group
export const updateName = async (req: Request, res: Response) =>{
    const { newName }: { newName: string }= req.body;
    const groupID: string = req.params._id;

    //Validation error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log("errors", errors);
        return res.status(400).json({ errors: errors.array() });
    }
    //Group existence error
    const existingGroup = await Group.findOne({name: newName})
    if(existingGroup){
        return res.status(409).json({ error: "This group name is already taken"});
    }
    //Updates group
    try {
        const result = await Group.updateOne({_id: new ObjectId(groupID)}, {$set: { name: newName }});
        if(result.matchedCount === 0){
            return res.status(404).json({ error: 'The desired group was not found'});
        }
        const updatedGroup = await Group.findOne({ _id: new ObjectId(groupID)});
        return res.status(200).json(updatedGroup);
    }
    catch (error: any) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }

}

//Deletes group by ID
export const deleteGroup = async (req: Request, res: Response) => {
    const groupID: string = req.params._id;
    try {
        const result = await Group.deleteOne({_id: new ObjectId(groupID)});
        if(result.deletedCount === 0){
            return res.status(404).json({ error: 'The desired group was not found'});
        }
        return res.status(200).json({ error: 'The group was successfully deleted'})
    }
    catch (error: any) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}
