import express from 'express';
import { createNewExercise, getExercises } from './exercise.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const exerciseRouter = express.Router();

exerciseRouter.route('/').post(protect, createNewExercise).get(protect, getExercises)

export default exerciseRouter;