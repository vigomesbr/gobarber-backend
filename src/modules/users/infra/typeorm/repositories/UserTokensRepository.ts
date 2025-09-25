import { Repository } from 'typeorm';
import UserToken from '../entities/UserToken';
import { PostgresDataSource } from '@shared/infra/typeorm';
import IUserTokenRepository from '@modules/users/repositories/IUserTokenRepository';

const customMethods = {

  async findByToken(this: Repository<UserToken>, token: string): Promise<UserToken | null> {
    const userToken = await this.findOne({
      where: { token }
    })

    return userToken || null;
    
  },

  async generete(this: Repository<UserToken>, user_id: string): Promise<UserToken> {
    const userToken = this.create({
      user_id
    })

    await this.save(userToken);

    return userToken;
    
  },

};

const userTokensRepository: Repository<UserToken> & IUserTokenRepository =
  PostgresDataSource.getRepository(UserToken).extend(customMethods);

export default userTokensRepository;