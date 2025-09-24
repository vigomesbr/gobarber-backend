import { Request, Response } from 'express';
import { container } from 'tsyringe';
import UpdateProfileService from '@modules/users/services/UpdateProfileService';
import ShowProfileService from '@modules/users/services/ShowProfileService';

export default class ProfileControllerController {
    public async update(request: Request, response: Response): Promise<Response> {
        const updateProfile = container.resolve(UpdateProfileService);

        const { name, email, old_password, password } = request.body;

        const user = await updateProfile.execute({
            user_id: request.user.id,
            name,
            email,
            old_password,
            password
        })

        const { password: _, ...userResponse } = user;

        return response.json(userResponse);

    }

    public async show(request: Request, response: Response): Promise<Response> {
        const showProfile = container.resolve(ShowProfileService);

        const user = await showProfile.execute({user_id: request.user.id})
        const { password: _, ...userResponse } = user;

        return response.json(user);

    }

}