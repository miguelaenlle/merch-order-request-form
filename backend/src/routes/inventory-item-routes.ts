import { Router } from 'express'; 
import { createInventoryItem, getIndividualInventoryItem, getInventoryItems, patchInventoryItem } from '../controllers/inventory-item-controller';
import { body, param, query } from 'express-validator';

const router = Router({ mergeParams: true });

router.post('/', [ 
    body('itemId').isString().withMessage('Item ID must be a string').notEmpty().withMessage('Item ID is required'),
    body('size').isString().withMessage('Size must be a string').notEmpty().withMessage('Size primary is required'),
    body('price').isNumeric().withMessage('Price must be a number').notEmpty().withMessage('Price is required'),
    body('amount').isNumeric().withMessage('Amount must be a number').notEmpty().withMessage('Amount is required')
], createInventoryItem); 
router.get('/', getInventoryItems);
router.get('/:inventoryItemId', [
    param('inventoryItemId').isString().withMessage('Inventory item id must be a string').notEmpty().withMessage('Inventory item id is required') 
], getIndividualInventoryItem);
router.patch('/', [
    query('itemId').isString().withMessage('Item id must be a string').notEmpty().withMessage('Item id is required'),
    body('updatedInventoryItems').isArray().withMessage('Updated inventory items must be an array') 
], patchInventoryItem);

export default router;

