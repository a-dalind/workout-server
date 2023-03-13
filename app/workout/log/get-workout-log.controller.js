import asyncHandler from 'express-async-handler';
import { prisma } from '../../prisma.js';
import { addPrevValues } from './add-prev-values.util.js';
import { calculateMinutes } from '../calculate-minutes-util.js';

// @desc   Get workoutLog
// @route  GET /api/workouts/log/:id
// @access Private

export const getWorkoutLog = asyncHandler(async(request, response) => {

	const workoutLog =  await prisma.workoutLog.findUnique({
		where: {
			id: +request.params.id
		},
		include: {
			workout: {
				include: {
					exercises: true
				}
			},
			exerciseLogs: {
				orderBy: {
					id: 'asc'
				},
				include: {
					exercise: true
				}
			}
		}
	});

	if (!workoutLog) {
		response.status(404);
		throw new Error('Workout Log not found')
	}

	response.json({
		...workoutLog,
		minute: calculateMinutes(workoutLog.workout.exercises.length)
	});
});
