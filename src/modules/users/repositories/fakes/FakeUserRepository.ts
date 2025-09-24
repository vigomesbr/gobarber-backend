import User from '@modules/users/infra/typeorm/entities/User';
import ICreateUsertDTO from '@modules/users/dtos/ICreateUserDTO';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import { uuid } from 'uuidv4';
import IFindAllProvidersDTO from '@modules/users/dtos/IFindAllProvidersDTO';

class FakeUsersRepository implements IUsersRepository {
  private users: User[] = [];

  public async findAllProviders({except_user_id }: IFindAllProvidersDTO): Promise<User[]> {
      let { users } = this;

      if (except_user_id) {
        users = this.users.filter(user => user.id !== except_user_id)
      }

      return users
  }

  public async findById(id: string): Promise<User | null> {
    const user = this.users.find(user => user.id == id)
    return user || null;
  }

  public async findByEmail( email: string): Promise<User | null> {
    const user = this.users.find(user => user.email == email)
    return user || null;    
  }

  public async create(data: ICreateUsertDTO): Promise<User> {
    const user = new User();
    Object.assign(user, { id: uuid(), ...data });
    this.users.push(user);
    return user;
  }

  public async save(user: User): Promise<User> {
    const findIndex = this.users.findIndex(findUser => findUser.id == user.id)
    this.users[findIndex] = user;
    return user;
  }
}

export default FakeUsersRepository;