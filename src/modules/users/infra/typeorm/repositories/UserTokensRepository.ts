import { Repository } from 'typeorm';
import UserToken from '../entities/UserToken';
import { PostgresDataSource } from '@shared/infra/typeorm';
import IUserTokenRepository from '@modules/users/repositories/IUserTokenRepository';

class UserTokenRepository implements IUserTokenRepository {
  private ormRepository: Repository<UserToken>;

  constructor() {
    this.ormRepository = PostgresDataSource.getRepository(UserToken);
  }

  public async findByToken(token: string): Promise<UserToken | null> {
    const userToken = await this.ormRepository.findOne({
      where: { token },
    });

    return userToken;
  }

  public async generate(user_id: string): Promise<UserToken> {
    const userToken = this.ormRepository.create({
      user_id,
    });

    await this.ormRepository.save(userToken);

    return userToken;
  }
}

export default UserTokenRepository;