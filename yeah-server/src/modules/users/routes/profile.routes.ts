import { Router } from 'express';
import isAuthenticated from '../../../shared/http/middlewares/isAutheticated';
import ProfileController from '../controllers/ProfileController';

const profileRouter = Router();
const profileController = new ProfileController();

profileRouter.use(isAuthenticated);

profileRouter.get('/:id', profileController.show);

profileRouter.put('/', profileController.update);

export default profileRouter;
