import FakeUsersRepository from "../repositories/fakes/FakeUserRepository";
import AppError from '@shared/errors/AppError';
import FakeHashProvider from "../providers/HashProvider/fakes/FakeHashProvider";
import UpdateProfileService from "./UpdateProfileService";

describe('UpdateProfile', () => {

    let userRepository: FakeUsersRepository;
    let hashProvider: FakeHashProvider;
    let updateProfile: UpdateProfileService;

    beforeEach(() => {
        userRepository = new FakeUsersRepository();
        hashProvider = new FakeHashProvider();
        updateProfile = new UpdateProfileService(userRepository, hashProvider);
    })

    it('should be able to user update profile info', async () => {

        const user = await userRepository.create({
            name: 'Vinicius',
            email: 'vini@gmail.com',
            password: '123123'
        });

        const updatedUser = await updateProfile.execute({
            user_id: user.id,
            name: 'New Name',
            email: 'vini@gmail.com'
        });

        expect(updatedUser.name).toBe('New Name');
    });

    it('should not be able to user update email for already email used', async () => {

        await userRepository.create({
            name: 'Vinicius 1',
            email: 'mesmo@email.com',
            password: '123123'
        });

        const user = await userRepository.create({
            name: 'Vinicius 2',
            email: 'vinicius@gmail.com',
            password: '123123'
        });

        await expect(
            updateProfile.execute({
                user_id: user.id,
                name: 'Vinicius 2',
                email: 'mesmo@email.com'
            })
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should be able to user update the password', async () => {

        const user = await userRepository.create({
            name: 'Vinicius',
            email: 'vini@gmail.com',
            password: '123123'
        });

        const updatedUser = await updateProfile.execute({
            user_id: user.id,
            name: 'Vinicius',
            email: 'vini@gmail.com',
            password: '123456',
            old_password: '123123'
        });

        expect(updatedUser.password).toBe('123456');
    });

    it('should not be able to user update the password without old_password', async () => {

        const user = await userRepository.create({
            name: 'Vinicius',
            email: 'vini@gmail.com',
            password: '123123'
        });

        const updatedUser = await 

        await expect(updateProfile.execute({
                user_id: user.id,
                name: 'Vinicius',
                email: 'vini@gmail.com',
                password: '123456',
            })
        ).rejects.toBeInstanceOf(AppError)
    });

    it('should not be able to user update the password when old_password is null or incorretc ', async () => {

        const user = await userRepository.create({
            name: 'Vinicius',
            email: 'vini@gmail.com',
            password: '123123'
        });


        await expect(updateProfile.execute({
                user_id: user.id,
                name: 'Vinicius',
                email: 'vini@gmail.com',
                password: '123456',
                old_password: 'incorret'
            })
        ).rejects.toBeInstanceOf(AppError)
    });



});