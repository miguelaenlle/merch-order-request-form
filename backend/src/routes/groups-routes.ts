import express from 'express';
import {createGroup, retrieveGroups, getSpecificGroup, updateName, deleteGroup} from '../controllers/groups-controller';
import {body} from "express-validator";
import { auth } from '../middleware/auth'


const router = express.Router();

router.post('/', [
    body('name').isString().withMessage('Name must be a string').notEmpty().withMessage('Name is required').isLength({ min: 3, max: 25 })], auth, createGroup);
router.get('/', auth, retrieveGroups);
router.get('/:_id', auth, getSpecificGroup);
router.put('/:_id', [
    body('newName').isString().withMessage('Name must be a string').notEmpty().withMessage('Name is required').isLength({ min: 3, max: 25 })], auth, updateName);
router.delete('/:_id', auth, deleteGroup);

export default router;