import { Request, Response } from 'express';
import CreateSessionsService from '../services/CreateSessionsService';

export default class UsersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const createUser = new CreateSessionsService();

    const user = await createUser.execute({
      email,
      password,
    });

    return response.json(user);
  }
}
