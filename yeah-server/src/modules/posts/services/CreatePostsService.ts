import UsersRepository from '@modules/users/typeorm/repositories/UsersRepository';
import AppError from '@shared/erros/AppError';
import { getCustomRepository } from 'typeorm';
import Posts from '../typeorm/entities/Posts';
import uploadConfig from '@config/upload';
import S3StorageProvider from '@shared/Providers/StorageProvider/S3StorageProvader';
import DiskStorageProvider from '@shared/Providers/StorageProvider/DiskStorageProvader';
import { v4 as uuidv4 } from 'uuid';
import PostsRepository from '../typeorm/repositories/PostsRepository';

interface IRequest {
  message: string;
  imageMessage: string;
  recipient_id: string;
  sending_id: string;
  user_id: string;
  userLogged: string;
}

class CreatePostsService {
  public async execute({
    message,
    imageMessage,
    recipient_id,
    sending_id,
    user_id,
    userLogged,
  }: IRequest): Promise<Posts> {
    const postsRepository = getCustomRepository(PostsRepository);
    const userRepository = getCustomRepository(UsersRepository);

    const user = await userRepository.findById(recipient_id);
    const findPosts = await postsRepository.findById(recipient_id, sending_id);

    const created = `${new Date().getHours()}:${new Date().getMinutes()}`;
    let conversation_id: string; /* eslint-disable */

    if (findPosts) {
      conversation_id = findPosts.conversation_id;
    } else {
      const findInvertPost = await postsRepository.findById(
        sending_id,
        recipient_id,
      );

      if (findInvertPost) {
        conversation_id = findInvertPost.conversation_id;
      } else {
        conversation_id = uuidv4();
      }
    }

    if (sending_id !== userLogged) {
      throw new AppError('User not Logged');
    }

    if (!user) {
      throw new AppError('User not found');
    }

    if (!message && imageMessage) {
      if (uploadConfig.driver === 's3') {
        const storageProvider = new S3StorageProvider();

        const filename = await storageProvider.saveFile(imageMessage);
        imageMessage = filename;
        user.lastArchive = filename;
      } else {
        const storageProvider = new DiskStorageProvider();

        const filename = await storageProvider.saveFile(imageMessage);
        imageMessage = filename;
        user.lastArchive = filename;
      }
    }

    user.lastMessage = message;
    user.lastTime = created;

    await userRepository.save(user);

    const post = await postsRepository.create({
      message,
      conversation_id,
      imageMessage,
      recipient_id,
      sending_id,
      created_at: created,
    });

    await postsRepository.save(post);

    return post;
  }
}

export default CreatePostsService;
