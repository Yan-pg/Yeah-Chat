import { Request, Response } from 'express';
import UpdateTypingService from '../services/UpdateTypingService';

export default class UserIsTypingController {
  public async update(
    request: Request | any,
    response: Response,
  ): Promise<Response> {
    const updateTyping = new UpdateTypingService();

    const isTyping = await updateTyping.execute({
      user_id: request.user.id,
    });

    request.io.emit('change-typing', isTyping);

    return response.json(isTyping);
  }
}
