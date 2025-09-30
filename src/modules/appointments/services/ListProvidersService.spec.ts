import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUserRepository';
import AppError from '@shared/errors/AppError';
import ListProvidersService from './ListProvidersService';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';

describe('ListProviders', () => {

    let userRepository: FakeUsersRepository;
    let cacheProvider: FakeCacheProvider;
    let listProviders : ListProvidersService;

    beforeEach(() => {
        userRepository = new FakeUsersRepository();
        cacheProvider = new FakeCacheProvider();
        listProviders = new ListProvidersService(userRepository, cacheProvider);
    })

    it('should be able to list providers', async () => {

        const user1 = await userRepository.create({
            name: 'Vinicius 1',
            email: 'vini1@gmail.com',
            password: '123456'
        })

        const user2 = await userRepository.create({
            name: 'Vinicius 2',
            email: 'vini2@gmail.com',
            password: '123456'
        })

        const loggerUser = await userRepository.create({
            name: 'Logged',
            email: 'logged@gmail.com',
            password: '123456'
        });

        const providers = await listProviders.execute({user_id: loggerUser.id});

        expect(providers).toEqual([user1, user2]);

    });

    

});    