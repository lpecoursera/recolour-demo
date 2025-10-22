import express from 'express'
import { getStatuses, getActions } from '../controllers/modelDataController.js'

const router = express.Router();

router.get('/statuses', getStatuses);
router.get('/actions', getActions);

export default router;