import { EntityRepository, Repository } from 'typeorm';
import Post from '../entities/Posts';

@EntityRepository(Post)
class PostsRepository extends Repository<Post> {
  public async findById(
    recipient_id: string,
    sending_id: string,
  ): Promise<Post | undefined> {
    const posts = await this.findOne({
      where: {
        recipient_id,
        sending_id,
      },
    });

    return posts;
  }

  public async findByConversationId(
    conversation_id: string,
  ): Promise<Post[] | undefined> {
    const posts = await this.find({
      where: {
        conversation_id,
      },
    });

    return posts;
  }
}

export default PostsRepository;
