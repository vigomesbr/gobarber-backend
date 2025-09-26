import { Request, Response } from 'express';
import CreateUserService from '@modules/users/services/CreateUserService';
import { container } from 'tsyringe';
import { CreateUserBody } from '../validators/users.validators';

export default class UsersController {
    public async create(request: Request, response: Response): Promise<Response> {
       const { name, email, password } = request.body as CreateUserBody;

        const createUser = container.resolve(CreateUserService);

        const user = await createUser.execute({ 
            name,
            email,
            password 
        });

        const { password: _, ...userResponse } = user;

        return response.json(userResponse);

    }
}