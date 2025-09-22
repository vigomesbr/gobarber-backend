import { injectable, inject } from 'tsyringe';
import { sign } from 'jsonwebtoken';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';
import authConfig from '@config/auth';
import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';
import User from '../infra/typeorm/entities/User';

interface Request {
  email: string;
  password: string;
}

interface Response {
  user: User;
  token: string;
}

@injectable()
class AuthenticateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider
  ) {}

  public async execute({ email, password }: Request): Promise<Response> {
    // 1. Verifica se o usuário existe
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Incorrect email/password combination.', 401);
    }

    // 2. Verifica se a senha está correta
    const passwordMatched = await this.hashProvider.compareHash(password, user.password);

    if (!passwordMatched) {
      throw new AppError('Incorrect email/password combination.', 401);
    }

    // 3. Se tudo estiver certo, gera o token JWT
    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    });

    // 4. Retorna o usuário e o token
    return {
      user,
      token,
    };
  }
}

export default AuthenticateUserService;