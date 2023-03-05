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

	response.json(user)
})
