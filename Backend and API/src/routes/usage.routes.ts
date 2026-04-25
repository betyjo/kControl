import { Router } from 'express';
import { getUsageStats } from '../controllers/usage.controller';
import { authMiddleware } from '../middleware/auth.middleware';

const router = Router();

router.get('/', authMiddleware, getUsageStats);

export default router;
