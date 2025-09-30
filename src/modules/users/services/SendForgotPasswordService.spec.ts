import FakeUsersRepository from "../repositories/fakes/FakeUserRepository";
import AppError from '@shared/errors/AppError';
import ResetPasswordService from "./ResetPasswordService";
import FakeUserTokenRepository from "../repositories/fakes/FakeUserTokenRepository";
import FakeHashProvider from "../providers/HashProvider/fakes/FakeHashProvider";

let usersRepository: FakeUsersRepository;
let userTokenRepository: FakeUserTokenRepository;
let resetPassword: ResetPasswordService;
let hashProvider: FakeHashProvider;

describe('SendForgotPassword', () => {
    beforeEach(() => {
        hashProvider = new FakeHashProvider();
        usersRepository = new FakeUsersRepository();
        userTokenRepository = new FakeUserTokenRepository();
        resetPassword = new ResetPasswordService(usersRepository, userTokenRepository, hashProvider);

    })

    it('should be able to reset password ', async () => {

        const user = await usersRepository.create({
            name: 'Vinicius',
            email: 'vini@gmail.com',
            password: '123456'
        })

        const userToken = await userTokenRepository.generate(user.id)
        const genereteHash = jest.spyOn(hashProvider, 'generateHash')


        await resetPassword.execute({
            password: '123123',
            token: userToken.token
        })

        const updateUser = await usersRepository.findById(user.id)

        expect(genereteHash).toHaveBeenCalledWith('123123')
        expect(updateUser?.password).toBe('123123');
    });

    it('should not be able to reset password with non-exists token', async () => {

        await expect(
            resetPassword.execute({
                token: 'non-exists-token',
                password: '123456'
            })
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to reset password with non-exists user', async () => {

        const { token } = await userTokenRepository.generate('non-exists-user');

        await expect(
            resetPassword.execute({
                token,
                password: '123456'
            })
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to reset password if more passed then 2 hours', async () => {

        const user = await usersRepository.create({
            name: 'Vinicius',
            email: 'vini@gmail.com',
            password: '123456'
        })

        const userToken = await userTokenRepository.generate(user.id)

        jest.spyOn(Date, 'now').mockImplementationOnce(() => {
            const customDate = new Date();

            return customDate.setHours(customDate.getHours() + 3);
        })

        await expect(
                resetPassword.execute({
                password: '123123',
                token: userToken.token
            })
        ).rejects.toBeInstanceOf(AppError)

    });

});