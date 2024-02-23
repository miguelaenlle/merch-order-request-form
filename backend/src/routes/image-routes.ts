import { Router } from 'express';
import { body, param } from 'express-validator';
import { createImage, deleteImage, getImages, putImage } from '../controllers/image-controller';
const router = Router({ mergeParams: true });

router.post('/:itemId/images', [
    param("itemId").isString().withMessage("Item ID must be a string").notEmpty().withMessage('Item ID is required'),
    body('imageUrl').isString().withMessage('Image URL must be a string').notEmpty().withMessage('Image URL is required'),
    body('isPrimary').isBoolean().withMessage('Is image primary must be a boolean').notEmpty().withMessage('Is image primary is required'),
    body('order').isNumeric().withMessage('Order number must be a number').notEmpty().withMessage('Order number is required')
], createImage);
router.get('/:itemId/images', [
    param("itemId").isString().withMessage("Item ID must be a string").notEmpty().withMessage('Item ID is required') 
], getImages);
router.put('/images/:imageId', [
    param("itemId").isString().withMessage("Item ID must be a string").notEmpty().withMessage('Item ID is required'),
    body('imageUrl').isString().withMessage('Image URL must be a string').notEmpty().withMessage('Image URL is required'),
    body('isPrimary').isBoolean().withMessage('Is image primary must be a boolean').notEmpty().withMessage('Is image primary is required'),
    body('order').isNumeric().withMessage('Order number must be a number').notEmpty().withMessage('Order number is required')
], putImage);
router.delete('/images/:imageId', [
    param("itemId").isString().withMessage("Item ID must be a string").notEmpty().withMessage('Item ID is required') 
], deleteImage); 

export default router;

