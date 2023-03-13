import express from 'express';
import { createNewWorkout, deleteWorkout, getWorkout, getWorkouts, updateWorkout } from './workout.controller.js';
import { protect } from '../middleware/auth.middleware.js';
import { createNewWorkoutLog } from './log/create-workout-log.controller.js';
import { updateWorkoutLog } from './log/update-workout-log.controller.js';
import { getWorkoutLog } from './log/get-workout-log.controller.js';

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

workoutRouter
	.route('/log/:id')
	.post(protect, createNewWorkoutLog)
	.get(protect, getWorkoutLog)
	.patch(protect, updateWorkoutLog)

workoutRouter
	.route('/log/complete/:id')
	.patch(protect, updateWorkoutLog)

export default workoutRouter;