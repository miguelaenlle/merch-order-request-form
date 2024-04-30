import { Router } from 'express'; 
import { body } from 'express-validator';
import { getFilteredInventoryItems } from '../controllers/filter-item-controller';

const router = Router({ mergeParams: true }); 
router.get('/', getFilteredInventoryItems);

export default router;
