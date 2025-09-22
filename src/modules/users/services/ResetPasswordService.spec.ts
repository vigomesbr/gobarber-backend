import FakeUsersRepository from "../repositories/fakes/FakeUserRepository";
import AppError from '@shared/errors/AppError';
import SendForgotPasswordService from "./SendForgotPasswordService";
import FakeMailProvider from "@shared/container/providers/MailProvider/fakes/FakeMailProvider";
import FakeUserTokenRepository from "../repositories/fakes/FakeUserTokenRepository";

let usersRepository: FakeUsersRepository;
let mailProvider: FakeMailProvider;
let userTokenRepository: FakeUserTokenRepository;
let sendForgotPassword: SendForgotPasswordService;

describe('SendForgotPassword', () => {
    beforeEach(() => {
        usersRepository = new FakeUsersRepository();
        userTokenRepository = new FakeUserTokenRepository();
        mailProvider = new FakeMailProvider();
        sendForgotPassword = new SendForgotPasswordService(usersRepository, mailProvider, userTokenRepository);

    })

    it('should be able to recover the password using the email', async () => {

        const sendMail = jest.spyOn(mailProvider, 'sendMail')

        await usersRepository.create({
            name: 'Vinicius',
            email: 'vini@gmail.com',
            password: '123456'
        })

        await sendForgotPassword.execute({
            email: 'vini@gmail.com'
        })
        
        expect(sendMail).toHaveBeenCalled();
    });

    it('should not be able to recover the password using the email when not exists', async () => {
        await expect(
            sendForgotPassword.execute({
            email: 'vini@gmail.com'
        })
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should generete a forgot password token', async () => {

        const genereteToken = jest.spyOn(userTokenRepository, 'generete')


        const user = await usersRepository.create({
            name: 'Vinicius',
            email: 'vini@gmail.com',
            password: '123456'
        })

        await sendForgotPassword.execute({
            email: 'vini@gmail.com'
        })
        
        expect(genereteToken).toHaveBeenCalledWith(user.id);
    })

});    