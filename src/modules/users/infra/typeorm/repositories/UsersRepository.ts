import { Repository, Not } from 'typeorm';
import User from '../entities/User';
import { PostgresDataSource } from '@shared/infra/typeorm';
import ICreateUsertDTO from '@modules/users/dtos/ICreateUserDTO';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IFindAllProvidersDTO from '@modules/users/dtos/IFindAllProvidersDTO';

const customMethods = {

  async findAllProviders(this: Repository<User>, { except_user_id }: IFindAllProvidersDTO): Promise<User[]> {
      let users: User[];

      if (except_user_id) {
        users = await this.find({
          where: {
            id: Not(except_user_id)
          }
        })
      } else {
        users = await this.find()
      }

      return users;
  },

  async findById(this: Repository<User>, id: string): Promise<User | null> {
    
    const user = await this.findOne({ 
    where: { id } 
    });

    return user;
  },
  
  async findByEmail(this: Repository<User>, email: string): Promise<User | null> {
    const user = await this.findOne({
        where: { email }
    });

    return user;    
  },

  async create(this: Repository<User>, data: ICreateUsertDTO): Promise<User> {
    const user = await this.save(data); 
    return user;
  },

};

const usersRepository: Repository<User> & IUsersRepository  =
  PostgresDataSource.getRepository(User).extend(customMethods);

export default usersRepository;