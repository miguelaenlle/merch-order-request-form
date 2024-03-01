import express from 'express';
import {createGroup, retrieveGroups, getSpecificGroup, updateName, deleteGroup} from '../controllers/groups-controller';
import {body} from "express-validator";

const router = express.Router();

router.post('/groups', [
    body('name').isString().withMessage('Name must be a string').notEmpty().withMessage('Name is required').isLength({ min: 3, max: 25 })], createGroup);
router.get('/groups', retrieveGroups);
router.get('/groups/{id}',[
    body('name').isString().withMessage('Name must be a string').notEmpty().withMessage('Name is required')], getSpecificGroup);
router.put('/groups/{id}', [
    body('name').isString().withMessage('Name must be a string').notEmpty().withMessage('Name is required').isLength({ min: 3, max: 25 })], updateName);
router.delete('/groups/{id}', deleteGroup);

export default router;