import User from '../infra/typeorm/entities/User';
import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';
import { injectable, inject } from 'tsyringe';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import IUserTokenRepository from '../repositories/IUserTokenRepository';

interface Request {
    email: string;
}

@injectable()
class SendForgotPasswordService {

    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,

        @inject('MailProvider')
        private mailProvider: IMailProvider,

        @inject('UserTokenRepository')
        private tokenRepository: IUserTokenRepository,
    ) {}
    
    public async execute({email}: Request): Promise<void> {
        const user = await this.usersRepository.findByEmail(email)
       
        if (!user){
            throw new AppError('The user not exists')
        }

        await this.tokenRepository.generete(user.id)
        this.mailProvider.sendMail(email, 'Pedido de recuperação de senha recebido')
    }
}

export default SendForgotPasswordService;