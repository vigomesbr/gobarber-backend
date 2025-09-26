import { Router } from 'express';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import multer from 'multer';
import uploadConfig from '@config/upload';
import UsersController from '../controllers/UsersController';
import UserAvatarController from '../controllers/UserAvatarController';
import { validateRequest } from '@shared/infra/http/middlewares/validateRequest';
import { createUserBodySchema } from '../validators/users.validators';

const usersRouter = Router();
const upload = multer(uploadConfig);
const usersController = new UsersController();
const userAvatarController = new UserAvatarController();

usersRouter.post(
    '/',
    validateRequest({ body: createUserBodySchema }), 
    usersController.create);

usersRouter.patch('/avatar', ensureAuthenticated, upload.single('avatar'), userAvatarController.update)

export default usersRouter;