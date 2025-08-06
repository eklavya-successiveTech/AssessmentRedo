import express from 'express';
import userRoutes from '../modules/users/routes/User.route';
import studentRoutes from '../modules/students/routes/Student.routes';

const router = express.Router();

router.use('/users', userRoutes);
router.use('/assessment', studentRoutes);

export default router;