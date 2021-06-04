import AppError from '@shared/erros/AppError';
import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import UsersRepository from '../typeorm/repositories/UsersRepository';
import DiskStorageProvider from '@shared/Providers/StorageProvider/DiskStorageProvader';
import uploadConfig from '@config/upload';
import S3StorageProvider from '@shared/Providers/StorageProvider/S3StorageProvader';

interface IRequest {
  user_id: string;
  avatarFileName: string;
}

class UpdateUserAvatarService {
  public async execute({ user_id, avatarFileName }: IRequest): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepository);

    const user = await usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not found.');
    }

    if (uploadConfig.driver === 's3') {
      const storageProvider = new S3StorageProvider();
      if (user.avatar) {
        await storageProvider.deleteFile(user.avatar);
      }

      const filename = await storageProvider.saveFile(avatarFileName);
      user.avatar = filename;
    } else {
      const storageProvider = new DiskStorageProvider();
      if (user.avatar) {
        await storageProvider.deleteFile(user.avatar);
      }

      const filename = await storageProvider.saveFile(avatarFileName);
      user.avatar = filename;
    }

    await usersRepository.save(user);

    return user;
  }
}

export default UpdateUserAvatarService;
