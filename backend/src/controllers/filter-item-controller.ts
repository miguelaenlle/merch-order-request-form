import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import InventoryItem from '../models/inventory-item';
import Item from '../models/item';
import mongoose from 'mongoose';
import Group from '../models/group';
import User from '../models/user';

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
            filter.name = { $regex: regex }
        }

        if (size) {
            let items = await InventoryItem.find({
                size, amount: {
                    $gt: 0
                }
            })

            if (!items) {
                return res.status(404).json({ message: "Item Not Found" })
            }

            for (const item of items) {
                inventorySizeIds.push(item.itemId)
            }

            filter._id = { $in: inventorySizeIds }
        }

        let findItems = await Item.find(filter)

        if (!findItems) {
            return res.status(404).json({ message: "Item Not Found" })
        }

        let i = 0;

        let expandedFindItems: { [key: string]: any }[] = [...findItems];

        for (const item of expandedFindItems) {
            const invItem = await InventoryItem.findOne({ itemId: item._id, price: { $gt: 0 } })
            const group = await Group
                .findOne({ _id: item.groupId });

            const user = await User
                .findOne({ _id: item.itemOwnerId })

            expandedFindItems[i] = {
                ...expandedFindItems[i].toObject(),
                price: invItem?.price,
                groupIdName: group?.name,
                itemOwnerId: user?._id,
                itemOwnerName: user?.name,
                filename: item.filename,
            }


            i++;
        }

        console.log('expandedFindItems', expandedFindItems);




        // Sort

        const sortedBy = req.query.sortedBy as string

        if (sortedBy == "price") {
            expandedFindItems = expandedFindItems.sort((a, b) => a.price - b.price)
        } else if (sortedBy == "name") {
            expandedFindItems = expandedFindItems.sort((a, b) => a.name.localeCompare(b.name))
        }

        return res.status(200).json({ findItems: expandedFindItems })

    } catch (error: any) {
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
} 