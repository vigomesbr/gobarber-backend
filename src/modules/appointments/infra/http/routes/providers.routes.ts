import { Router } from 'express';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ProvidersController from '../controllers/ProvidersController';
import ProviderMonthAvailabilityController from '../controllers/ProviderMonthAvailabilityController';
import ProviderDayAvailabilityController from '../controllers/ProviderDayAvailabilityController';
import { validateRequest } from '@shared/infra/http/middlewares/validateRequest';
import { 
    providerMonthAvailabilityParamsSchema, 
    providerMonthAvailabilityQuerySchema,
    providerDayAvailabilityParamsSchema, 
    providerDayAvailabilityQuerySchema  
} from '../validators/providers.validators';

const providersRouter = Router();
const providersController = new ProvidersController();
const providerMonthAvailabilityController = new ProviderMonthAvailabilityController();
const providerDayAvailabilityController = new ProviderDayAvailabilityController();

providersRouter.use(ensureAuthenticated);

providersRouter.get('/', providersController.index);

providersRouter.get(
    '/:provider_id/month-availability', 
    validateRequest({ 
        params: providerMonthAvailabilityParamsSchema, 
        query: providerMonthAvailabilityQuerySchema
    }),
    providerMonthAvailabilityController.index);

providersRouter.get(
    '/:provider_id/day-availability', 
    validateRequest({ 
        params: providerDayAvailabilityParamsSchema, 
        query: providerDayAvailabilityQuerySchema
    }),
    providerDayAvailabilityController.index);


export default providersRouter;