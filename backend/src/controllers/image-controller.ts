import { Request, Response } from 'express'; 
import { validationResult } from 'express-validator';
import Image from '../models/image';
import Item from '../models/item';
import User from '../models/user';
import Dummy from '../models/dummy';

export const createImage = async (req: Request, res: Response) => {
    // Check for validation errors
    console.log("Req.body", req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log("errors", errors);
        return res.status(400).json({ errors: errors.array() });
    }
 
    try {
        const itemId = req.params.itemId as string
        const imageUrl = req.body.imageUrl as string
        const isPrimary = req.body.isPrimary as boolean
        const order = req.body.order as number

        const findItem = await Item.find({ _id: itemId }).catch(err => { return res.status(400).json(`Bad Request: ${err}`) })
        Image.find().then(data => {
            if (isPrimary) { 
                if (data.length > 0) { 
                    Image.updateMany({ isPrimary: true }, { isPrimary: false }, {
                        new: true,
                        upsert: true,
                    }).catch(err => { return res.status(400).json(`Bad Request: ${err}`) })
                }
            } 
        }).catch(err => {
            return res.status(400).json(`Bad Request: ${err}`)
        }) 
        console.log(findItem)
        if (!findItem) {
            res.status(404).json("Item Not Found")
        } 

        // const image = new Image({
        //     itemId: itemId,
        //     imageUrl: imageUrl,
        //     isPrimary: isPrimary,
        //     order: order
        // });

        // await image.save();
        // res.status(201).json({ image });
    } catch (error: any) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

export const getImages = async (req: Request, res: Response) => {
    try {
        const itemId = req.params.itemId

        const checkImage = await Image.find({ itemId }).catch(err => {
            return res.status(400).json(`Bad Request: ${err}`)
        });

        if (!checkImage) {
            return res.status(404).json("Image Not Found")
        }

        res.status(200).json(checkImage);
    } catch (error: any) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

export const putImage = async (req: Request, res: Response) => {
    // Check for validation errors
    console.log("Req.body", req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log("errors", errors);
        return res.status(400).json({ errors: errors.array() });
    }
 
    try {
        const imageId = req.params.imageId as string;
        const imageUrl = req.body.imageUrl as string;
        const isPrimary = req.body.isPrimary as boolean;
        const order = req.body.order as number;

        const checkImage = await Image.find({_id: imageId}).catch(err => {
            return res.status(400).json(`Bad Request: ${err}`)
        })

        if (!checkImage) {
            return res.status(404).json("Image Not Found") 
        } 

        const updateImageDetails = {
            imageUrl: imageUrl,
            isPrimary: isPrimary,
            order: order
        }

        const updateImage = Image.findOneAndUpdate({_id: imageId}, updateImageDetails, {
            new: true,
            upsert: true,
            includeResultMetadata: true
        }).catch(err => {
            return res.status(400).json(`Bad Request: ${err}`)
        })

        res.status(201).json({ updateImage });
    } catch (error: any) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}; 

export const deleteImage = async (req: Request, res: Response) => {
    // Check for validation errors
    console.log("Req.body", req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log("errors", errors);
        return res.status(400).json({ errors: errors.array() });
    }
 
    try {
        const imageId = req.params.imageId as string;
        
        const image = Image.findOneAndDelete({_id: imageId}).catch(err => { return res.status(400).json(`Bad Request ${err}`) })
        res.status(201).json({ image });
    } catch (error: any) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};