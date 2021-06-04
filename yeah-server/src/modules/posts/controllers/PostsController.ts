import { Request, Response } from 'express';
import CreatePostsService from '../services/CreatePostsService';
import ListePostsService from '../services/ListPostsUserSevice';
import { classToClass } from 'class-transformer';

export default class PostsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { recipient_id } = request.params;
    const listPost = new ListePostsService();

    const post = await listPost.execute({
      recipient_id,
      user_id: request.user.id,
    });

    return response.json({ post: classToClass(post) });
  }

  public async create(
    request: Request | any,
    response: Response,
  ): Promise<Response> {
    const { message, recipient_id } = request.body;
    const { id } = request.user;

    const createPost = new CreatePostsService();

    const post = await createPost.execute({
      message,
      imageMessage: request.file?.filename,
      recipient_id,
      sending_id: request.user.id,
      user_id: id,
      userLogged: id,
    });

    request.io.emit('create-post', post);

    return response.json({ post: classToClass(post) });
  }
}
