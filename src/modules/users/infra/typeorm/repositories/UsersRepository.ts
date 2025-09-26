import { Repository, Not } from 'typeorm';
import User from '../entities/User';
import { PostgresDataSource } from '@shared/infra/typeorm';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IFindAllProvidersDTO from '@modules/users/dtos/IFindAllProvidersDTO';

// A classe agora implementa a interface (o "contrato")
class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>;

  constructor() {
    // O construtor pega a instância do repositório do DataSource
    this.ormRepository = PostgresDataSource.getRepository(User);
  }

  // Cada método público agora usa o 'this.ormRepository' para acessar os métodos do TypeORM
  public async findById(id: string): Promise<User | null> {
    const user = await this.ormRepository.findOneBy({ id });
    return user;
  }

  public async findByEmail(email: string): Promise<User | null> {
    const user = await this.ormRepository.findOneBy({ email });
    return user;
  }

  public async findAllProviders({ except_user_id }: IFindAllProvidersDTO): Promise<User[]> {
    if (except_user_id) {
      return this.ormRepository.find({
        where: { id: Not(except_user_id) },
      });
    }
    return this.ormRepository.find();
  }

  public async create(data: ICreateUserDTO): Promise<User> {
    const user = this.ormRepository.create(data);
    await this.ormRepository.save(user);
    return user;
  }

  public async save(user: User): Promise<User> {
    return this.ormRepository.save(user);
  }
}

export default UsersRepository;