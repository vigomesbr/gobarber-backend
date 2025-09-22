import { Router } from 'express';
import ForgotPasswordController from '../controllers/ForgotPasswordController';
import ResetPasswordController from '../controllers/ResetPasswordController';

const passwordRouter = Router();
const forgotPasswordControlller = new ForgotPasswordController();

passwordRouter.post('/forgot', forgotPasswordControlller.create);

export default passwordRouter;