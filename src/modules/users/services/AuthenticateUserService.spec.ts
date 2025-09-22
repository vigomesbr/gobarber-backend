import AuthenticateUserService from "./AuthenticateUserService";
import CreateUserService from "./CreateUserService";
import FakeUsersRepository from "../repositories/fakes/FakeUserRepository";
import FakeHashProvider from "../providers/HashProvider/fakes/FakeHashProvider";
import AppError from '@shared/errors/AppError';

describe('AuthenticateUser', () => {
    it('should be able to authenticate', async () => {
        const userRepository = new FakeUsersRepository();
        const hashProvider = new FakeHashProvider();
        const authenticateUser = new AuthenticateUserService(userRepository, hashProvider);

        const createUser = new CreateUserService(userRepository, hashProvider);
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
        const userRepository = new FakeUsersRepository();
        const hashProvider = new FakeHashProvider();
        const authenticateUser = new AuthenticateUserService(userRepository, hashProvider);


        await expect(
            authenticateUser.execute({
            email: 'vini@gmail.com',
            password: '123456'
            })
        ).rejects.toBeInstanceOf(AppError);

    });

    it('should not be able to authenticate with wrong password', async () => {
        const userRepository = new FakeUsersRepository();
        const hashProvider = new FakeHashProvider();
        const authenticateUser = new AuthenticateUserService(userRepository, hashProvider);

        const createUser = new CreateUserService(userRepository, hashProvider);
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