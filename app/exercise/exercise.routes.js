import express from 'express';
import { createNewExercise, deleteExercise, getExercises, updateExercise } from './exercise.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const exerciseRouter = express.Router();

exerciseRouter
	.route('/')
	.post(protect, createNewExercise)
	.get(protect, getExercises)

exerciseRouter
	.route('/:id')
	.put(protect, updateExercise)
	.delete(protect, deleteExercise)

export default exerciseRouter;