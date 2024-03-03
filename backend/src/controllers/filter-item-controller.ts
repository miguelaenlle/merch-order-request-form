import { Request, Response } from 'express'; 
import { validationResult } from 'express-validator'; 
import InventoryItem from '../models/inventory-item'; 
import Item from '../models/item';
import mongoose from 'mongoose';

export const getFilteredInventoryItems = async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log("errors", errors);
        return res.status(422).json({ errors: errors.array() });
    }

    try {
        // Filter
        let fetchedInventoryItems = {};
        const itemOwner = req.query.itemOwner as string
        const size = req.query.size as string
        const name = req.query.name as string

        // Sort

        const sortedBy = req.query.sortedBy as string

        if (itemOwner && size && name) {
            let tempData: any[] = await Item.find({})
            let tempDataObject: any;
            if (!tempData) {
                res.status(404).json({ message: "Not Found" })
            }

            tempData.forEach((data) => {
                const isIdValid = mongoose.Types.ObjectId.isValid(data._id) 
    
                if (!isIdValid) {
                    return res.status(500).json({ message: "Invalid Data" }) 
                }
                
                if (data.name.toLowerCase().includes(name.toLowerCase()) && data.itemOwner.toLowerCase().includes(itemOwner.toLowerCase())) {
                    tempDataObject = data._id
                }  
            })
            fetchedInventoryItems = {itemId: tempDataObject, size: size, amount: {$gt: 1}}
        } else if (itemOwner && !size && !name) {
            let tempData: any[] = await Item.find({})
            let tempDataObject: any;
            if (!tempData) {
                res.status(404).json({ message: "Not Found" })
            }

            tempData.forEach((data) => { 
                const isIdValid = mongoose.Types.ObjectId.isValid(data._id) 
    
                if (!isIdValid) {
                    return res.status(500).json({ message: "Invalid Data" }) 
                }

                if (data.itemOwner.toLowerCase().includes(itemOwner.toLowerCase())) {
                    tempDataObject = data._id
                }  
            })
            fetchedInventoryItems = {itemId: tempDataObject, amount: {$gt: 1}}
        } else if (!itemOwner && size && !name) {
            fetchedInventoryItems = await InventoryItem.find({size: size})
        } else if (!itemOwner && !size && name) {
            let tempData: any[] = await Item.find({})
            let tempDataObject: any;
            if (!tempData) {
                res.status(404).json({ message: "Not Found" })
            }

            tempData.forEach((data) => {
                const isIdValid = mongoose.Types.ObjectId.isValid(data._id) 
    
                if (!isIdValid) {
                    return res.status(500).json({ message: "Invalid Data" }) 
                }
                
                if (data.name.toLowerCase().includes(name.toLowerCase())) {
                    tempDataObject = data._id
                }  
            })
            fetchedInventoryItems = {itemId: tempDataObject, amount: {$gt: 1}}
        } else if (itemOwner && name && !size) {
            let tempData: any[] = await Item.find({})
            let tempDataObject: any;
            if (!tempData) {
                res.status(404).json({ message: "Not Found" })
            }

            tempData.forEach((data) => {
                const isIdValid = mongoose.Types.ObjectId.isValid(data._id) 
    
                if (!isIdValid) {
                    return res.status(500).json({ message: "Invalid Data" }) 
                }
                
                if (data.name.toLowerCase().includes(name.toLowerCase()) && data.itemOwner.toLowerCase().includes(itemOwner.toLowerCase())) {
                    tempDataObject = data._id
                }  
            })
            fetchedInventoryItems = {itemId: tempDataObject, amount: {$gt: 1}}
        } else if (itemOwner && !name && size) {
            let tempData: any[] = await Item.find({})
            let tempDataObject: any;
            if (!tempData) {
                res.status(404).json({ message: "Not Found" })
            }

            tempData.forEach((data) => {
                const isIdValid = mongoose.Types.ObjectId.isValid(data._id) 
    
                if (!isIdValid) {
                    return res.status(500).json({ message: "Invalid Data" }) 
                }
                
                if (data.itemOwner.toLowerCase().includes(itemOwner.toLowerCase())) {
                    tempDataObject = data._id
                }  
            })
            fetchedInventoryItems = {itemId: tempDataObject, size: size, amount: {$gt: 1}}
        } else if (!itemOwner && name && size) {
            let tempData: any[] = await Item.find({})
            let tempDataObject: any;
            if (!tempData) {
                res.status(404).json({ message: "Not Found" })
            }

            tempData.forEach((data) => {
                const isIdValid = mongoose.Types.ObjectId.isValid(data._id) 
    
                if (!isIdValid) {
                    return res.status(500).json({ message: "Invalid Data" }) 
                }
                
                if (data.name.toLowerCase().includes(name.toLowerCase())) {
                    tempDataObject = data._id
                }  
            })
            fetchedInventoryItems = {itemId: tempDataObject, size: size, amount: {$gt: 1}}
        }

        if (!fetchedInventoryItems) {
            res.status(404).json({ message: "Not Found" })
        }

        let finalInventoryItems = await InventoryItem.find(fetchedInventoryItems)
        let finalItems = await Item.find({})

        if (sortedBy == "price") {
            finalInventoryItems = await InventoryItem.find(fetchedInventoryItems).sort({price: 1})
        } else if (sortedBy == "name") {
            let tempData: any[] = await Item.find({})
            if (!tempData) {
                res.status(404).json({ message: "Not Found" })
            }

            finalItems = await Item.find({}).sort({name: 1})
        }

        res.status(200).json({finalInventoryItems, finalItems})

    } catch (error: any) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
} 