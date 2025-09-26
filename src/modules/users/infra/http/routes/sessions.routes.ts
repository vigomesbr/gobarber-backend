import { Router } from 'express';
import SessionController from '../controllers/SessionsController';
import { validateRequest } from '@shared/infra/http/middlewares/validateRequest';
import { sessionsBodySchema } from '../validators/sessions.validators';

const sessionsRouter = Router();
const sessionController = new SessionController();

sessionsRouter.post(
    '/',
    validateRequest({ body: sessionsBodySchema }), 
    sessionController.create);

export default sessionsRouter;