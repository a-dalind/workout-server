import 'colors';
import express from 'express';
import authRouter from './app/auth/auth.routes.js';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { prisma } from './app/prisma.js';

dotenv.config();

const app = express();

async function main () {
	if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

	app.use(express.json());
	app.use('/api/auth', authRouter);

	const PORT = process.env.PORT || 4000;

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