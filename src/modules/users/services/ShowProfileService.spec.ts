import CreateUserService from "./CreateUserService";
import FakeUsersRepository from "../repositories/fakes/FakeUserRepository";
import AppError from '@shared/errors/AppError';
import ShowProfileService from "./ShowProfileService";

describe('CreateUser', () => {

    let userRepository: FakeUsersRepository;
    let showProfile : ShowProfileService;

    beforeEach(() => {
        userRepository = new FakeUsersRepository();
        showProfile = new ShowProfileService(userRepository);
    })

    it('should be able to show user', async () => {

        const user = await userRepository.create({
            name: 'Vinicius',
            email: 'vini@gmail.com',
            password: '123456'
        })

        const profile = await showProfile.execute({user_id: user.id});

        expect(profile.name).toBe('Vinicius');
        expect(profile.email).toBe('vini@gmail.com');

    });

    it('should not be able to show non-exists user', async () => {

        await expect(
            showProfile.execute({
                user_id: 'non-exists'
            })
        ).rejects.toBeInstanceOf(AppError);

    });

});    