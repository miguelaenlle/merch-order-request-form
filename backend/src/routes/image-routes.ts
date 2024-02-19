import { Router } from 'express';
import { body } from 'express-validator';
import { createImage, deleteImage, getImages, putImage } from '../controllers/image-controller';

const router = Router({ mergeParams: true });

router.post('/:itemId/images', createImage);
router.get('/:itemId/images', getImages);
router.put('/images/:imageId', putImage);
router.delete('/images/:imageId', deleteImage); 

export default router;

