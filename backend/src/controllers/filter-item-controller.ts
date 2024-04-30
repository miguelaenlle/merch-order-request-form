import { Request, Response } from 'express'; 
import { validationResult } from 'express-validator'; 
import InventoryItem from '../models/inventory-item'; 
import Item from '../models/item';
import mongoose from 'mongoose';

interface ItemInterface {
    _id: string,
    name: string,
    description: string,
    pickupLocation: string,
    pickupTime: string
}

interface FilterInterface {
    _id?: any;
    itemOwner?: string; 
    name?: any
}

export const getFilteredInventoryItems = async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log("errors", errors);
        return res.status(422).json({ errors: errors.array() });
    }

    try {
        // Filter
        let fetchedInventoryItems: any = {};
        const itemOwner = req.query.itemOwner as string
        const size = req.query.size as string
        const name = req.query.name as string 

        let filter: FilterInterface = {}
        let inventorySizeIds: any = []


        if (itemOwner) {
            filter.itemOwner = itemOwner  
        }

        const regex = new RegExp(name, 'i')

        if (name) {
            filter.name = {$regex: regex}
        } 

        if (size) {
            let items = await InventoryItem.find({ size })

            if (!items) {
                return res.status(404).json({message: "Item Not Found"})
            } 

            for (const item of items) {
                inventorySizeIds.push(item.itemId)
            }

            filter._id = { $in: inventorySizeIds }
        }  

        const findItems = await Item.find(filter)

        if (!findItems) {
            return res.status(404).json({message: "Item Not Found"})
        }




        // Sort

        const sortedBy = req.query.sortedBy as string



        if (!fetchedInventoryItems) {
            return res.status(404).json({ message: "Not Found" })
        }

        let finalInventoryItems = await InventoryItem.find(fetchedInventoryItems)
        let finalItems = await Item.find({})

        if (sortedBy == "price") {
            finalInventoryItems = await InventoryItem.find(fetchedInventoryItems).sort({price: 1})
        } else if (sortedBy == "name") {
            let tempData: ItemInterface[] = await Item.find({})
            if (!tempData) {
                return res.status(404).json({ message: "Not Found" })
            }

            finalItems = await Item.find({}).sort({name: 1})
        } 

        return res.status(200).json({findItems}) 

    } catch (error: any) {
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
} 