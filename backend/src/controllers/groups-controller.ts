import { Request, Response } from 'express';
import { v4 as uuid } from 'uuid';

interface Group {
    name:string;
    _id:string;
}

let groups: Group[] = []; //Array of groups

//Creates a group with the desired name and gives a unique ID
export const createGroup = async (req: Request, res: Response) => {
    const { name }: { name: string } = req.body;

    //Checks if there's a similar group
    if (groups.find((group) => group.name === name)) {
        return res.status(409).json({ error: "The group name was already taken"});
    }
    //Validates the provided name
    if (typeof name !== 'string' || name.length > 30 ){
        return res.status(400).json({ error: "The group name must not exceed 30 characters"});
    }
    //Creates a new group with name and id
    const newGroup : Group = { name, _id: uuid()};
    groups.push(newGroup);

    return res.status(201).json(newGroup);
}

//Returns the existing groups
export const retrieveGroups = async (res: Response) => {
    return res.status(200).json(groups);
}

//Find specific group by ID
export const getSpecificGroup = async (req: Request, res:Response) => {
    const groupID: string = req.body;
    const desiredGroup = groups.find((desiredGroup) => desiredGroup._id === groupID);

    if (desiredGroup){
        return res.status(200).json(desiredGroup);
    }
    else{
        return res.status(404).json({ error: "No group with the provided ID exists"});
    }
}

//Updates the name of an existing group
export const updateName = async (req: Request, res: Response) =>{
    const newName: string = req.body;
    const groupID: string = req.params._id;
    const index = groups.findIndex((index) => index._id === groupID);

    //Validation error
    if (typeof newName !== 'string' || newName.length > 30 ){
        return res.status(400).json({ error: "The group name must not exceed 30 characters"});
    }
    //Group existence error
    if(groups.find((dupe) => dupe.name === newName)){
        return res.status(409).json({ error: "This group name is already taken"});
    }
    //Checks group ID
    if(index !== 0){
        return res.status(404).json({ error: "The desired group was not found"});
    }
    //Adds the new name based on the ID
    else{
        groups[index].name = newName;
        return res.status(200).json(groups[index]);
    }
}

//Deletes group by ID
export const deleteGroup = async (req: Request, res: Response) => {
    const groupID: string = req.params._id;
    const index = groups.findIndex((index) => index._id === groupID);
    //Checks group ID
    if(index !== 0){
        return res.status(404).json({ error: "The desired group was not found"});
    }
    //Deletes the group by ID
     else if(index > -1){
        groups.splice(index, 1);
        return res.status(200).json("The desired group was deleted successfully");
     }
}
