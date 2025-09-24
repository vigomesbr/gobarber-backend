import AuthenticateUserService from "./AuthenticateUserService";
import CreateUserService from "./CreateUserService";
import FakeUsersRepository from "../repositories/fakes/FakeUserRepository";
import FakeHashProvider from "../providers/HashProvider/fakes/FakeHashProvider";
import AppError from '@shared/errors/AppError';

describe('AuthenticateUser', () => {
    let userRepository: FakeUsersRepository;
    let hashProvider: FakeHashProvider;
    let authenticateUser: AuthenticateUserService;
    let createUser: CreateUserService;

    beforeEach(() => {
        userRepository = new FakeUsersRepository();
        hashProvider = new FakeHashProvider();
        authenticateUser = new AuthenticateUserService(userRepository, hashProvider);
        createUser = new CreateUserService(userRepository, hashProvider);

    });

    it('should be able to authenticate', async () => {

        const user = await createUser.execute({
            name: 'Vinicius',
            email: 'vini@gmail.com',
            password: '123456'
        })


        const authenticate = await authenticateUser.execute({
            email: 'vini@gmail.com',
            password: '123456'
        })

        expect(authenticate).toHaveProperty('token');
        expect(authenticate.user).toEqual(user);

    });

    it('should not be able to authenticate non existing user', async () => {

        await expect(
            authenticateUser.execute({
            email: 'vini@gmail.com',
            password: '123456'
            })
        ).rejects.toBeInstanceOf(AppError);

    });

    it('should not be able to authenticate with wrong password', async () => {

        await createUser.execute({
            name: 'Vinicius',
            email: 'vini@gmail.com',
            password: '123456'
        })

        await expect(
            authenticateUser.execute({
                email: 'vini@gmail.com',
                password: 'wrong-password'
            })
        ).rejects.toBeInstanceOf(AppError);

    });

});    