import { Request, Response } from 'express';
import UpdateStatusService from '../services/UpdateStatusService';

export default class UserStatusController {
  public async update(
    request: Request | any,
    response: Response,
  ): Promise<Response> {
    const updateStatus = new UpdateStatusService();

    const status = await updateStatus.execute({
      user_id: request.user.id,
    });

    request.io.emit('change-status', status);

    return response.json(status);
  }
}
