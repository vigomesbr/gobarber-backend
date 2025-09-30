import { Request, Response } from 'express';
import { container } from 'tsyringe';
import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';
import { userResponseSchema } from '../validators/users.validators';

export default class UserAvatarController {
    public async update(request: Request, response: Response): Promise<Response> {
        const updateUserAvatar = container.resolve(UpdateUserAvatarService);

        if (!request.file) {
            return response.status(400).json({ error: 'Avatar file is required.' });
        }

        const user = await updateUserAvatar.execute({
            user_id: request.user.id,
            avatarFileName: request.file.filename
        })

        const userResponse = userResponseSchema.parse(user);
        
        return response.json({ user: userResponse });
        

    }
}