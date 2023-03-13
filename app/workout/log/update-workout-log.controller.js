import asyncHandler from 'express-async-handler';
import { prisma } from '../../prisma.js';

// @desc   Update workout log completed
// @route  PATCH /api/workouts/log/complete/:id
// @access Private

export const updateWorkoutLog = asyncHandler(async (request, response) => {
	const logId = +request.params.id;

	try {
		const workoutLog = await prisma.workoutLog.update({
			where: {
				id: logId
			},
			data: { isCompleted: true }
		});
		response.json(workoutLog);
	} catch (error) {
		response.status(404);
		throw new Error('Workout Log not found');
	}
});
