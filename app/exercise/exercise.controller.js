import { prisma } from '../prisma.js';
import asyncHandler from 'express-async-handler';

// @desc   Get exercises
// @route  GET /api/exercises
// @access Private

export const getExercises = asyncHandler(async(request, response) => {
	const exercises =  await prisma.exercise.findMany({
		orderBy: {
			createdAt: 'desc'
		}
	});

	response.json(exercises);
});

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

// @desc   Update exercise
// @route  PUSH /api/exercises/:id
// @access Private

export const updateExercise = asyncHandler(async(request, response) => {
	const {name, times, iconPath} = request.body;

	try {
		const exercise =  await prisma.exercise.update({
			where: {
				id: +request.params.id
			},
			data: {
				name,
				times,
				iconPath
			}
		})

		response.json(exercise);
	} catch (error) {
		response.status(404);
		throw new Error('Exercise not found')
	}
});

// @desc   Delete exercise
// @route  DELETE /api/exercises/:id
// @access Private

export const deleteExercise = asyncHandler(async(request, response) => {

	try {
		const exercise =  await prisma.exercise.delete({
			where: {
				id: +request.params.id
			},
		})

		response.json({message: 'Exercise was deleted'});
	} catch (error) {
		// console.log(error)
		response.status(404);
		throw new Error('Exercise not found')
	}
});
