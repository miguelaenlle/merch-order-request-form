import { Router } from 'express';
import { body } from 'express-validator';
import { createInventoryItem, getIndividualInventoryItem, getInventoryItems, patchInventoryItem } from '../controllers/inventory-item-controller';

const router = Router({ mergeParams: true });

router.post('/', createInventoryItem); 
router.get('/', getInventoryItems);
router.get('/:inventoryItemId', getIndividualInventoryItem);
router.patch('/', patchInventoryItem);

export default router;

