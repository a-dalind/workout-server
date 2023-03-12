import express from 'express';
import { createNewExercise, deleteExercise, getExercises, updateExercise } from './exercise.controller.js';
import { protect } from '../middleware/auth.middleware.js';
import { createNewExerciseLog } from './log/create-exercise-log.controller.js';
import { getExerciseLog } from './log/get-exercise-log.controller.js';
import { completeExerciseLog, updateExerciseLogTime } from './log/update-exercise-log.controller.js';

const exerciseRouter = express.Router();

exerciseRouter
	.route('/')
	.post(protect, createNewExercise)
	.get(protect, getExercises)

exerciseRouter
	.route('/:id')
	.put(protect, updateExercise)
	.delete(protect, deleteExercise)

exerciseRouter
	.route('/log/:id')
	.post(protect, createNewExerciseLog)
	.get(protect, getExerciseLog)

exerciseRouter
	.route('/log/time/:id')
	.put(protect, updateExerciseLogTime)

exerciseRouter
	.route('/log/complete/:id')
	.patch(protect, completeExerciseLog)

export default exerciseRouter;