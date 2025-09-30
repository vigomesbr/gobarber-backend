import CreateUserService from "./CreateUserService";
import FakeUsersRepository from "../repositories/fakes/FakeUserRepository";
import AppError from '@shared/errors/AppError';
import FakeHashProvider from "../providers/HashProvider/fakes/FakeHashProvider";
import FakeCacheProvider from "@shared/container/providers/CacheProvider/fakes/FakeCacheProvider";

describe('CreateUser', () => {

    let userRepository: FakeUsersRepository;
    let hashProvider: FakeHashProvider;
    let cacheProvider:  FakeCacheProvider;
    let createUser: CreateUserService;

    beforeEach(() => {
        userRepository = new FakeUsersRepository();
        hashProvider = new FakeHashProvider();
        cacheProvider = new FakeCacheProvider();    
        createUser = new CreateUserService(userRepository, hashProvider, cacheProvider);

    })

    it('should be able to create a new user', async () => {

        const user = await createUser.execute({
            name: 'Vinicius',
            email: 'vini@gmail.com',
            password: '123456'
        })

        expect(user).toHaveProperty('id');
    });

    it('should be able to create a new user with email exists in another user', async () => {

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