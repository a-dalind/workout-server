import express from 'express';
import { authUser } from './auth.controller.js';

const authRouter = express.Router();

authRouter.route('/login').post(authUser);

export default authRouter;