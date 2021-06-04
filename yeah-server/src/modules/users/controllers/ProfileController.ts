import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';
import ShowProfileService from '../services/UpdateProfileService';
import UpdateProfileService from '../services/ShowProfileService';

export default class ProfileController {
  public async show(request: Request, response: Response): Promise<Response> {
    const showProfile = new ShowProfileService();

    const { id } = request.params;

    const user = await showProfile.execute({
      user_id: id,
    });

    return response.json({ user: classToClass(user) });
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { name, email, password, old_password } = request.body;
    const user_id = request.user.id;

    const updateProfile = new UpdateProfileService();

    const user = await updateProfile.execute({
      user_id,
      name,
      email,
      password,
      old_password,
    });

    delete user.password;

    return response.json(user);
  }
}
