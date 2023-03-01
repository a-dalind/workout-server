// @desc   Auth user
// @route  POST /api/auth/login
// @access Public

import { prisma } from '../prisma.js';

export const authUser = async (request, response) => {

	const user =  await prisma.user.findMany()

	// response.json({message: 'You are authenticated'})
	response.json(user)
}

// GET
// POST
// PUT Обновление (весь профайл)
// PATCH обновление (1 поле)
// DELETE