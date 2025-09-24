import User from '../infra/typeorm/entities/User';
import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';
import { injectable, inject } from 'tsyringe';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

interface Request {
    user_id: string;
    name: string;
    email: string;
    password?: string;
    old_password?: string;
}

@injectable()
class UpdateProfileService {
   
    constructor (
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,

        @inject('HashProvider')
        private hashProvider: IHashProvider
    ) {}
    
    public async execute({user_id, name, email, password, old_password }: Request): Promise<User> {
        const user = await this.usersRepository.findById(user_id)

        if (!user) {
            throw new AppError('User not found')
        }

        const userWithSameEmail = await this.usersRepository.findByEmail(email);

        if (userWithSameEmail && userWithSameEmail.id !== user_id) {
            throw new AppError('This email already used');
        }

        user.name = name;
        user.email = email;

        if (password && !old_password) {
            throw new AppError('You need to inform old password')
        }


        if (password && old_password) {
            const oldPasswordVerify =  await this.hashProvider.compareHash(old_password, user.password);
            if ( !oldPasswordVerify) {
                throw new AppError('Old password is incorrect')
            }
            user.password = await this.hashProvider.generateHash(password)
        }

        const updatedUser = await this.usersRepository.save(user);

        return updatedUser;
    }
}

export default UpdateProfileService;