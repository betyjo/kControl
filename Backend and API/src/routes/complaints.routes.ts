import { Router } from 'express';
import { submitComplaint, getMyComplaints } from '../controllers/complaints.controller';
import { authMiddleware } from '../middleware/auth.middleware';

const router = Router();

router.post('/', authMiddleware, submitComplaint);
router.get('/', authMiddleware, getMyComplaints);

export default router;
