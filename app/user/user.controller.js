// @desc   Get user profile
// @route  GET /api/user/profile
// @access Private

import { prisma } from '../prisma.js';
import asyncHandler from 'express-async-handler';
import { UserFields } from '../utils/user.utils.js';

export const getUserProfile = asyncHandler(async(request, response) => {

	const user = await prisma.user.findUnique({
		where: {
			id: request.user.id,
		},
		select: UserFields,
	})


	const countExerciseTimesCompleted = await prisma.exerciseLog.count({
		where: {
			userId: request.user.id,
			isCompleted: true
		}
	})

	const kgs = await prisma.exerciseTime.aggregate({
		where: {
			exerciseLog: {
				userId: request.user.id
			},
			isCompleted: true
		},

		_sum: {
			weight: true
		}
	})

	const workouts = await prisma.workoutLog.count({
		where: {
			userId: user.id,
			isCompleted: true
		}
	})

	response.json({
		...user,
		statistics: [
			{
				label: 'Minutes',
				value: Math.ceil(countExerciseTimesCompleted * 5) || 0
			},
			{
				label: 'Workouts',
				value: workouts
			},
			{
				label: 'Kgs',
				value: kgs._sum.weight || 0
			}
		]
	})
})
