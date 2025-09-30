import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';
import { injectable, inject } from 'tsyringe';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import IUserTokenRepository from '../repositories/IUserTokenRepository';
import path = require('path');

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

        const { token } = await this.tokenRepository.generate(user.id)
        
        const forgotPasswordTemplate = path.resolve(
            __dirname,
            '..',
            'views',
            'forgot_password.hbs'
        );
        
        await this.mailProvider.sendMail({
            to: {
                name: user.name,
                email: user.email
            },
            subject: '[GoBarber] Recuperação de senha',
            templateData: {
                file: forgotPasswordTemplate,
                variables: {
                    name: user.name,
                    link: `${process.env.APP_WEB_URL}/reset_password?token=${token}`
                }
            }
        })
    }
}

export default SendForgotPasswordService;