import express from 'express';
import { authUser, registerUser } from './auth.controller.js';

const authRouter = express.Router();

authRouter.route('/login').post(authUser);
authRouter.route('/register').post(registerUser);

export default authRouter;