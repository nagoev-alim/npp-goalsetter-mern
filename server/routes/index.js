import express from 'express';
import goalsRouter from './goals.js';
import usersRouter from './users.js';

const allRoutes = express.Router();

allRoutes.use('/goals', goalsRouter);
allRoutes.use('/users', usersRouter);

export default allRoutes;
