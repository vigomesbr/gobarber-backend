import UpdateUserAvatarService from "./UpdateUserAvatarService";
import FakeUsersRepository from "../repositories/fakes/FakeUserRepository";
import AppError from '@shared/errors/AppError';
import FakeStorageProvider from "@shared/container/providers/StorageProvider/fakes/FakeStorageProvider";

describe('UpdateUserAvatar', () => {
    it('should be able to user update a avatar file', async () => {
        const userRepository = new FakeUsersRepository();
        const storageProvider = new FakeStorageProvider();

        const updateUserAvatar = new UpdateUserAvatarService(
            userRepository,
            storageProvider
        )

        const user = await userRepository.create({
            name: 'Vinicius',
            email: 'vini@gmail.com',
            password: '123123'
        })

        await updateUserAvatar.execute({
            user_id: user.id,
            avatarFileName: 'avatar.jpg'
        })

        expect(user.avatar).toBe('avatar.jpg');
    });

    it('should not be able to non-existing user update a avatar file', async () => {
        const userRepository = new FakeUsersRepository();
        const storageProvider = new FakeStorageProvider();

        const updateUserAvatar = new UpdateUserAvatarService(
            userRepository,
            storageProvider
        )

        await expect(
            updateUserAvatar.execute({
                user_id: 'non-existing user',
                avatarFileName: 'avatar.jpg'
            })
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should delete old avatar when new one updating new one', async () => {
        const userRepository = new FakeUsersRepository();
        const storageProvider = new FakeStorageProvider();
        const deleteFile = jest.spyOn(storageProvider, 'deleteFile');

        const updateUserAvatar = new UpdateUserAvatarService(
            userRepository,
            storageProvider
        )

        const user = await userRepository.create({
            name: 'Vinicius',
            email: 'vini@gmail.com',
            password: '123123'
        })

        await updateUserAvatar.execute({
            user_id: user.id,
            avatarFileName: 'avatar.jpg'
        });

        await updateUserAvatar.execute({
            user_id: user.id,
            avatarFileName: 'avatar2.jpg'
        });

        expect(user.avatar).toBe('avatar2.jpg');
        expect(deleteFile).toHaveBeenCalledWith('avatar.jpg');
        
    });

});