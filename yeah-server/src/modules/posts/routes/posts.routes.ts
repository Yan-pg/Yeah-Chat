import isAuthenticated from '@shared/http/middlewares/isAutheticated';
import { Router } from 'express';
import PostsController from '../controllers/PostsController';
import multer from 'multer';
import uploadConfig from '@config/upload';

const sessionRoute = Router();

const postsController = new PostsController();
const upload = multer(uploadConfig.multer);

sessionRoute.post(
  '/',
  isAuthenticated,
  upload.single('imageMessage'),
  postsController.create,
);

sessionRoute.get('/:recipient_id', isAuthenticated, postsController.index);

export default sessionRoute;
