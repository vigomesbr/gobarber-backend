import { Router } from 'express';
import ForgotPasswordController from '../controllers/ForgotPasswordController';
import ResetPasswordController from '../controllers/ResetPasswordController';
import { validateRequest } from '@shared/infra/http/middlewares/validateRequest';
import { forgotPasswordSchema, resetPasswordBodySchema } from '../validators/password.validators';

const passwordRouter = Router();
const forgotPasswordControlller = new ForgotPasswordController();
const resetPassword = new ResetPasswordController();

passwordRouter.post(
    '/forgot',
    validateRequest({ body: forgotPasswordSchema }), 
    forgotPasswordControlller.create);

passwordRouter.post(
    '/reset', 
    validateRequest({ body: resetPasswordBodySchema }),
    resetPassword.create);


export default passwordRouter;