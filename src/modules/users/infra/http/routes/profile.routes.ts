import { Router } from 'express';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import ProfileControllerController from '../controllers/ProfileController';
import { validateRequest } from '@shared/infra/http/middlewares/validateRequest';
import { updateProfileBodySchema } from '../validators/profile.validators';

const profileRouter = Router();
const profileController = new ProfileControllerController();
profileRouter.use(ensureAuthenticated);

profileRouter.put(
    '/update', 
    validateRequest({body: updateProfileBodySchema}),
    profileController.update);

    
profileRouter.get('/show', profileController.show);


export default profileRouter;