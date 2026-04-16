import express from 'express';
import { createGroup, createMember, fetchGroups, fetchMemberDetail, fetchMembers } from '../controllers/SplitsController.js';
const router = express.Router();

router.post('/createGroup', createGroup);
router.get('/fetchGroups', fetchGroups);
router.post('/createMember', createMember);
router.get('/fetchMemberDetails/:id', fetchMemberDetail);
router.get('/fetchMembers/:groupId', fetchMembers);

export default router;