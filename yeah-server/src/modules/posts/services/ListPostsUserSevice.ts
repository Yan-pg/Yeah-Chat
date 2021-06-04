import { getCustomRepository } from 'typeorm';
import Posts from '../typeorm/entities/Posts';
import PostRepository from '../typeorm/repositories/PostsRepository';
interface IRequest {
  recipient_id: string;
  user_id: string;
}

class ListPostsService {
  public async execute({
    recipient_id,
    user_id,
  }: IRequest): Promise<Posts[] | undefined> {
    const postRepository = getCustomRepository(PostRepository);
    const findPosts = await postRepository.findById(recipient_id, user_id);
    let conversation_id = '';

    if (findPosts) {
      conversation_id = findPosts.conversation_id;
    } else {
      const findInvertPost = await postRepository.findById(
        user_id,
        recipient_id,
      );
      if (findInvertPost) {
        conversation_id = findInvertPost.conversation_id;
      }
    }

    const post = postRepository.findByConversationId(conversation_id);
    return post;
  }
}

export default ListPostsService;
