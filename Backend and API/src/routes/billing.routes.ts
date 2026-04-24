import { Router } from 'express';
import { getMyBills } from '../controllers/billing.controller';
import { authMiddleware } from '../middleware/auth.middleware';

const router = Router();

router.get('/', authMiddleware, getMyBills);

export default router;
