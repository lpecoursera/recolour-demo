import express from 'express'
import { listUsers, getUser } from '../controllers/usersController.js'

const router = express.Router();

router.get('/', listUsers);
router.get('/:id', getUser);

export default router;