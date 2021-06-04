import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Exclude, Expose } from 'class-transformer';
import uploadConfig from '@config/upload';

@Entity('users')
class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column()
  lastMessage: string;

  @Column()
  lastTime: string;

  @Column()
  @Exclude()
  lastArchive: string;

  @Column()
  @Exclude()
  avatar: string;

  @Column()
  status: 'OFFLINE' | 'ONLINE';

  @Column()
  isTyping: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Expose({ name: 'lastArchive_url' })
  getLastArchive(): string | null {
    if (!this.lastArchive) return null;

    switch (uploadConfig.driver) {
      case 'disk':
        return `http://192.168.1.115:3333/files/${this.lastArchive}`;
      case 's3':
        return `https://${uploadConfig.config.aws.bucket}.s3.amazonaws.com/${this.lastArchive}`;
      default:
        return null;
    }
  }

  @Expose({ name: 'avatar_url' })
  getAvatarImage_url(): string | null {
    if (!this.avatar) return null;

    switch (uploadConfig.driver) {
      case 'disk':
        return `http://192.168.1.115:3333/files/${this.avatar}`;
      case 's3':
        return `https://${uploadConfig.config.aws.bucket}.s3.amazonaws.com/${this.avatar}`;
      default:
        return null;
    }
  }
}

export default User;
