import UserToken from '@modules/users/infra/typeorm/entities/UserToken';
import IUserTokenRepository from '../IUserTokenRepository';
import { uuid } from 'uuidv4';

class FakeUserTokenRepository implements IUserTokenRepository {
  private userTokens: UserToken[] = [];

    public async generate(user_id: string): Promise<UserToken> {
        const userToken = new UserToken();

        Object.assign(userToken, {
            id: uuid(),
            token: uuid(),
            user_id,
            created_at: new Date(),
            updated_at: new Date()
        })

        this.userTokens.push(userToken)

        return userToken;
    }

    public async findByToken(token: string): Promise<UserToken | null> {
        const userToken = this.userTokens.find(findToken => findToken.token === token);
        return userToken || null;

    }

 
}

export default FakeUserTokenRepository;