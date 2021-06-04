import { Router } from 'express';
import UsersController from '../controllers/UsersController';
import isAuthenticated from '../../../shared/http/middlewares/isAutheticated';
import UserAvatarController from '../controllers/UserAvatarController';
import UserStatusController from '../controllers/UserStatusController';
import UserIsTypingController from '../controllers/UserIsTypingController';
import multer from 'multer';
import uploadConfig from '@config/upload';

const usersRouter = Router();
const usersController = new UsersController();
const userAvatarController = new UserAvatarController();
const userStatusController = new UserStatusController();
const userIsTypingController = new UserIsTypingController();

const upload = multer(uploadConfig.multer);

usersRouter.get('/', isAuthenticated, usersController.index);

usersRouter.post('/', usersController.create);

usersRouter.patch('/status', isAuthenticated, userStatusController.update);
usersRouter.patch('/isTyping', isAuthenticated, userIsTypingController.update);
usersRouter.patch(
  '/avatar',
  isAuthenticated,
  upload.single('avatar'),
  userAvatarController.update,
);

export default usersRouter;
