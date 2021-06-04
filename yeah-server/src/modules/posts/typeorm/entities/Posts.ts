import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Expose, Exclude } from 'class-transformer';
import User from '@modules/users/typeorm/entities/User';
import uploadConfig from '@config/upload';
@Entity('posts')
class Posts {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  conversation_id: string;

  @Column()
  message: string;

  @Column()
  @Exclude()
  imageMessage: string;

  @Column()
  recipient_id: string;

  @Column()
  sending_id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  created_at: string;

  @UpdateDateColumn()
  updated_at: Date;

  @Expose({ name: 'imageMessage_url' })
  getImageMessage_url(): string | null {
    if (!this.imageMessage) return null;

    switch (uploadConfig.driver) {
      case 'disk':
        return `http://192.168.1.115:3333/files/${this.imageMessage}`;
      case 's3':
        return `https://${uploadConfig.config.aws.bucket}.s3.amazonaws.com/${this.imageMessage}`;
      default:
        return null;
    }
  }
}

export default Posts;
