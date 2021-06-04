import { Router } from 'express';
import SessionsController from '../controllers/SessionsController';

const sessionRoute = Router();
const sessionsController = new SessionsController();

sessionRoute.post('/', sessionsController.create);

export default sessionRoute;
