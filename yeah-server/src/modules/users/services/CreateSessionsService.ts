import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import UsersRepository from '../typeorm/repositories/UsersRepository';
import { sign } from 'jsonwebtoken';
import authConfig from '@config/auth';
import { compare } from 'bcryptjs';
import AppError from '@shared/erros/AppError';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user?: User;
  token: string;
}

class CreateSessionsService {
  public async execute({
    email,
    password,
  }: IRequest): Promise<IResponse | undefined> {
    const usersRepository = getCustomRepository(UsersRepository);
    const user = await usersRepository.findByEmail(email);
    const { secret, expiresIn } = authConfig.jwt;

    if (!user) {
      throw new AppError('incorrect email/passoword', 401);
    }

    const confirmedPassword = await compare(password, user.password);

    if (!confirmedPassword) {
      throw new AppError('incorrect email/passoword', 401);
    }

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    });

    return {
      user,
      token,
    };
  }
}

export default CreateSessionsService;
