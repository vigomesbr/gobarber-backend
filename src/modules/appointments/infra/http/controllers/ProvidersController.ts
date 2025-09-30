import {Request, Response } from 'express';
import { container } from 'tsyringe';
import ListProvidersService from '@modules/appointments/services/ListProvidersService';
import { usersListResponseSchema } from '@modules/users/infra/http/validators/users.validators';

export default class ProvidersController {
    public async index(request: Request, response: Response): Promise<Response> {

        const listProviders = container.resolve(ListProvidersService);
        
        const providers = await listProviders.execute({
            user_id: request.user.id
        });

        const safeProviders = usersListResponseSchema.parse(providers);

        return response.json(safeProviders);
    }
    
}