import { Router } from 'express';

import authMiddleware from './app/middlewares/authMiddleware';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';

const router = Router();

router.post('/sessions', SessionController.authenticate);
router.post('/users', UserController.store);
router.get('/users', authMiddleware, UserController.index);

export default router;