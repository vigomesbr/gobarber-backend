import { Router } from 'express';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import AppointmentsController from '../controllers/AppointmentsController';
import ProviderAppointmentsController from '../controllers/ProviderAppointmentsController';
import { validateRequest } from '@shared/infra/http/middlewares/validateRequest';
import { createAppointmentBodySchema, listProviderAppointmentsBodySchema } from '../validators/appointments.validators';


const appointmentsRouter = Router();
const appointmentsController = new AppointmentsController();
const providerAppointmentsController = new ProviderAppointmentsController();


appointmentsRouter.use(ensureAuthenticated);

appointmentsRouter.get('/me', 
    validateRequest({ body: listProviderAppointmentsBodySchema }),
    providerAppointmentsController.index);

appointmentsRouter.post(
    '/',
    validateRequest({ body: createAppointmentBodySchema }),
    appointmentsController.create);

export default appointmentsRouter;