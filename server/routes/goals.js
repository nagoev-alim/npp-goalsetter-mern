import express from 'express';
import { goalsController } from '../controllers/goals.js';
import protect from '../middleware/authMiddleware.js';

const goalsRouter = express.Router();

goalsRouter.route('/').get(protect, goalsController.get).post(protect, goalsController.create);
goalsRouter.route('/:id').delete(protect, goalsController.delete).put(protect, goalsController.update);

export default goalsRouter;
