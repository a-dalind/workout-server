import 'colors';
import express from 'express';
import authRouter from './app/auth/auth.routes.js';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { prisma } from './app/prisma.js';
import { notFound, errorHandler } from './app/middleware/error.middleware.js';
import userRouter from './app/user/user.routes.js';
import exerciseRouter from './app/exercise/exercise.routes.js';
import * as path from 'path';

dotenv.config();

const app = express();

async function main () {
	if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

	app.use(express.json());

	const __dirname = path.resolve();

	app.use('/uploads', express.static(path.join(__dirname, '/uploads/')));

	app.use('/api/auth', authRouter);
	app.use('/api/users', userRouter);
	app.use('/api/exercises', exerciseRouter);

	app.use(notFound);
	app.use(errorHandler);

	const PORT = process.env.PORT || 4009;

	app.listen(
		PORT,
		console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`.blue
			.bold
		)
	)
}

main()
	.then(async () => {
		await prisma.$disconnect
	})
.catch(async (e) => {
	console.error(e);
	await prisma.$disconnect();
	process.exit(1);
})

// brew services restart postgresql@15
// запускаем pgAdmin
// теперь работает пароль