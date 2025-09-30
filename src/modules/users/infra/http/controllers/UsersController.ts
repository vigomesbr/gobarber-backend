import { Request, Response } from 'express';
import CreateUserService from '@modules/users/services/CreateUserService';
import { container } from 'tsyringe';
import { CreateUserBody } from '../validators/users.validators';
import { userResponseSchema } from '../validators/users.validators';

export default class UsersController {
    public async create(request: Request, response: Response): Promise<Response> {
       const { name, email, password } = request.body as CreateUserBody;

        const createUser = container.resolve(CreateUserService);

        const user = await createUser.execute({ 
            name,
            email,
            password 
        });

        const userResponse = userResponseSchema.parse(user);
                
        return response.json({ user: userResponse });

    }
}