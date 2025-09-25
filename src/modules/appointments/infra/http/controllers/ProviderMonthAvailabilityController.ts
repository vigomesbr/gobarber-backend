import {Request, Response } from 'express';
import { container } from 'tsyringe';
import ListProviderMonthAvailabilityService from '@modules/appointments/services/ListProviderMonthAvailabilityService';
import AppError from '@shared/errors/AppError';

export default class ProviderMonthAvailabilityController {
    public async index(request: Request, response: Response): Promise<Response> {

        const { provider_id } = request.params;        

        const { month, year } = request.body;
        
        if (!provider_id) {
            throw new AppError('Provider ID must be provided in the URL.', 400);
        }
        
        const listProviderMonthAvailability = container.resolve(ListProviderMonthAvailabilityService);
        
        const availability = await listProviderMonthAvailability.execute({
            provider_id,
            month,
            year
        });


        return response.json(availability);
    }
    
}