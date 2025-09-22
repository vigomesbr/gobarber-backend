import CreateUserService from "./CreateUserService";
import FakeUsersRepository from "../repositories/fakes/FakeUserRepository";
import AppError from '@shared/errors/AppError';
import FakeHashProvider from "../providers/HashProvider/fakes/FakeHashProvider";

describe('CreateUser', () => {
    it('should be able to create a new user', async () => {
        const userRepository = new FakeUsersRepository();
        const hashProvider = new FakeHashProvider();
        const createUser = new CreateUserService(userRepository, hashProvider);

        const user = await createUser.execute({
            name: 'Vinicius',
            email: 'vini@gmail.com',
            password: '123456'
        })

        expect(user).toHaveProperty('id');
    });

    it('should be able to create a new user with email exists in another user', async () => {
        const userRepository = new FakeUsersRepository();
        const hashProvider = new FakeHashProvider();
        const createUser = new CreateUserService(userRepository, hashProvider);

        await createUser.execute({
            name: 'Vinicius',
            email: 'vini@gmail.com',
            password: '123456'
        })

        await expect(
            createUser.execute({
            name: 'Vinicius',
            email: 'vini@gmail.com',
            password: '123456'
        })
        ).rejects.toBeInstanceOf(AppError);
    });
});    