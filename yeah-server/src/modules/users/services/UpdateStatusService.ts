import AppError from '@shared/erros/AppError';
import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import UsersRepository from '../typeorm/repositories/UsersRepository';

interface IRequest {
  user_id: string;
}

class UpdateStatusService {
  public async execute({ user_id }: IRequest): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepository);

    const user = await usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not found.');
    }

    if (user.status === 'OFFLINE') {
      user.status = 'ONLINE';
    } else {
      user.status = 'OFFLINE';
    }

    await usersRepository.save(user);

    return user;
  }
}

export default UpdateStatusService;
