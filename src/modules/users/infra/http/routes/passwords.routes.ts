import { Router } from 'express';
import ForgotPasswordController from '../controllers/ForgotPasswordController';
import ResetPasswordController from '../controllers/ResetPasswordController';

const passwordRouter = Router();
const forgotPasswordControlller = new ForgotPasswordController();
const resetPassword = new ResetPasswordController();

passwordRouter.post('/forgot', forgotPasswordControlller.create);

passwordRouter.post('/reset', resetPassword.create);


export default passwordRouter;