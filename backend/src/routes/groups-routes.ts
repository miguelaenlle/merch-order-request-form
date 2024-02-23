import express from 'express';
import {createGroup, getSpecificGroup, retrieveGroups, updateName, deleteGroup} from '../controllers/groups-controller';

const router = express.Router();

router.post('/groups', createGroup);
router.get('/groups', retrieveGroups);
router.get('/groups/{id}', getSpecificGroup);
router.put('/groups/{id}', updateName);
router.delete('/groups/{id}', deleteGroup);

export default router;