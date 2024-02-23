import { Request, Response } from 'express'; 
import { validationResult } from 'express-validator';
import Image from '../models/image';
import Item from '../models/item'; 
import mongoose from 'mongoose';

export const createImage = async (req: Request, res: Response) => {
    // Check for validation errors 
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

        const isIdValid = mongoose.Types.ObjectId.isValid(itemId) 

        if (!isIdValid) {
            return res.status(500).json({ message: "Invalid Credentials" }) 
        }

        const findItem = await Item.findOne({ _id: itemId }) 

        const findImage = await Image.findOne({ isPrimary: true }) 

        if (isPrimary && findImage) {
            Image.findOneAndUpdate({ itemId: itemId, isPrimary: true }, { isPrimary: false }, {
                new: true,
                upsert: true
            }).catch(err => { 
                return res.status(500).json({ message: "Server Error", error: err.message }) 
            }) 
        }

        if (!findItem) {
            return res.status(404).json("Item Not Found")
        }

        const image = new Image({
            itemId: itemId,
            imageUrl: imageUrl,
            isPrimary: isPrimary,
            order: order
        });

        await image.save();
        return res.status(201).json({ image });
    } catch (error: any) {
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
};

export const getImages = async (req: Request, res: Response) => {
    try {
        const itemId = req.params.itemId
        const isIdValid = mongoose.Types.ObjectId.isValid(itemId)

        if (!isIdValid) {
            return res.status(500).json({ message: "Invalid Credentials" }) 
        }

        const images = await Image.find({ itemId }) 

        if (!images) {
            return res.status(404).json({ message: "Image Not Found" }) 
        }

        return res.status(200).json({ images });
    } catch (error: any) {
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
}

export const putImage = async (req: Request, res: Response) => {
    // Check for validation errors 
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
        const isIdValid = mongoose.Types.ObjectId.isValid(imageId) 

        if (!isIdValid) {
            return res.status(500).json({ message: "Invalid Credentials" })  
        }

        const image = await Image.find({_id: imageId}) 

        if (!image) {
            return res.status(404).json({ message: "Image Not Found" }) 
        } 

        const updateImageDetails = {
            imageUrl: imageUrl,
            isPrimary: isPrimary,
            order: order
        }

        const updateImage = await Image.findOneAndUpdate({_id: imageId}, updateImageDetails, {
            new: true,
            upsert: true,
            includeResultMetadata: true
        }) 
        
        Image.findOne({ _id: imageId }).then(data => {
            if (!data) {
                return res.status(404).json({ message: "Image Not Found" }) 
            }
            Image.findOne({ itemId: data.itemId }).then(newData => {
            if (newData) { 
                Image.findOneAndUpdate({ _id: newData?._id }, { isPrimary: true }, {
                    new: true,
                    upsert: true
                }).catch(err => { 
                    return res.status(500).json({ message: "Server Error", error: err.message }) 
                })
            }
            })
        })  

        
        return res.status(201).json({ updateImage });
    } catch (error: any) {
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
};  

export const deleteImage = async (req: Request, res: Response) => {
    // Check for validation errors 
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log("errors", errors);
        return res.status(400).json({ errors: errors.array() });
    }
 
    try {
        const imageId = req.params.imageId as string; 
        const isIdValid = mongoose.Types.ObjectId.isValid(imageId)

        if (!isIdValid) {
            return res.status(500).json({ message: "Invalid Image Id" }) 
        }  
  
        const deleteImage = await Image.findOneAndDelete({_id: imageId})  
        
        if (!deleteImage) {
            return res.status(404).json({ message: "Image Not Found" }) 
        }

        const image = await Image.findOne({ itemId: deleteImage.itemId }) 

        if (image) { 
            Image.findOneAndUpdate({ _id: image?._id }, { isPrimary: true }, {
                new: true,
                upsert: true
            }) 
        }

        return res.status(201).json({ deleteImage });
    } catch (error: any) {
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
};