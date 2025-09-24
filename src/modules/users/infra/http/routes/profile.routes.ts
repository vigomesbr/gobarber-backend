import { Router } from 'express';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import ProfileControllerController from '../controllers/ProfileController';

const profileRouter = Router();
const profileController = new ProfileControllerController();
profileRouter.use(ensureAuthenticated);

profileRouter.put('/update', profileController.update);
profileRouter.get('/show', profileController.show);


export default profileRouter;