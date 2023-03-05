import { prisma } from '../prisma.js';
import asyncHandler from 'express-async-handler';

// @desc   Create new exercise
// @route  POST /api/exercises
// @access Private

export const createNewExercise = asyncHandler(async(request, response) => {
	const {name, times, iconPath} = request.body;

	const exercise =  await prisma.exercise.create({
		data: {
			name,
			times,
			iconPath
		}
	})

	response.json(exercise);
});

// @desc   Get exercises
// @route  GET /api/exercises
// @access Private

export const getExercises = asyncHandler(async(request, response) => {
	const exercises =  await prisma.exercise.findMany();

	response.json(exercises);
});
