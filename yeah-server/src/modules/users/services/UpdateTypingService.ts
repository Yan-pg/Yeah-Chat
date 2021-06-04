import AppError from '@shared/erros/AppError';
import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import UsersRepository from '../typeorm/repositories/UsersRepository';

interface IRequest {
  user_id: string;
}

interface IResponse {
  user_id: string;
  isTyping: boolean;
}

class UpdateTypingService {
  public async execute({ user_id }: IRequest): Promise<IResponse> {
    const usersRepository = getCustomRepository(UsersRepository);
    const user = await usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not found.');
    }

    user.isTyping = !user.isTyping;

    await usersRepository.save(user);

    return { user_id: user.id, isTyping: user.isTyping };
  }
}

export default UpdateTypingService;
