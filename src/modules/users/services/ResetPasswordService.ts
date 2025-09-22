import User from '../infra/typeorm/entities/User';
import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';
import { injectable, inject } from 'tsyringe';
import IUserTokenRepository from '../repositories/IUserTokenRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';
import { isAfter, addHours } from 'date-fns';

interface Request {
    token: string;
    password: string;
}

@injectable()
class ResetPasswordService {

    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,

        @inject('UserTokenRepository')
        private tokenRepository: IUserTokenRepository,

        @inject('HashProvider')
        private hashProvider: IHashProvider,
    ) {}
    
    public async execute({token, password}: Request): Promise<void> {
        const userToken = await this.tokenRepository.findByToken(token);

        if(!userToken){
            throw new AppError('token is invalid')
        }

        const user = await this.usersRepository.findById(userToken.user_id)

        if (!user) {
            throw new AppError('User not existss');
        }

        const tokenCreatedAt = userToken.created_at;

        const compareDate = addHours(tokenCreatedAt, 2);

        if (isAfter(Date.now(), compareDate)) {
            throw new AppError('Token expired.')
        }
        

        user.password = await this.hashProvider.generateHash(password);

        await this.usersRepository.save(user);
        
    }
}

export default ResetPasswordService;