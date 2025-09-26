import { Request, Response } from 'express';
import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';
import { container } from 'tsyringe';
import { SessionsBody } from '../validators/sessions.validators';

export default class SessionController {
    public async create(request: Request, response: Response): Promise<Response> {
        const { email, password } = request.body as SessionsBody;

        const authenticateUser = container.resolve(AuthenticateUserService);

        const { user, token } = await authenticateUser.execute({
            email,
            password
        });

        const { password: _, ...userResponse } = user;
        
        return response.json({ user: userResponse, token });
    }
}