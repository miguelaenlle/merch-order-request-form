import express from 'express';
import {createGroup, retrieveGroups, getSpecificGroup, updateName, deleteGroup} from '../controllers/groups-controller';
import {body} from "express-validator";

const router = express.Router();

router.post('/', [
    body('name').isString().withMessage('Name must be a string').notEmpty().withMessage('Name is required').isLength({ min: 3, max: 25 })], createGroup);
router.get('/', retrieveGroups);
router.get('/:_id', getSpecificGroup);
router.put('/:_id', [
    body('name').isString().withMessage('Name must be a string').notEmpty().withMessage('Name is required').isLength({ min: 3, max: 25 })], updateName);
router.delete('/:_id', deleteGroup);

export default router;