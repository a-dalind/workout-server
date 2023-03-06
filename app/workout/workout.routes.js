import express from 'express';
import { createNewWorkout, deleteWorkout, getWorkout, getWorkouts, updateWorkout } from './workout.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const workoutRouter = express.Router();

workoutRouter
	.route('/')
	.post(protect, createNewWorkout)
	.get(protect, getWorkouts)

workoutRouter
	.route('/:id')
	.get(protect, getWorkout)
	.put(protect, updateWorkout)
	.delete(protect, deleteWorkout)

export default workoutRouter;