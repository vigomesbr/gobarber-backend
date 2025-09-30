import {Request, Response } from 'express';
import { container } from 'tsyringe';
import ListProviderMonthAvailabilityService from '@modules/appointments/services/ListProviderMonthAvailabilityService';
import AppError from '@shared/errors/AppError';
import {
  ProviderMonthAvailabilityParams,
  ProviderMonthAvailabilityQuery,
} from '../validators/providers.validators';

export default class ProviderMonthAvailabilityController {
    public async index(request: Request, response: Response): Promise<Response> {

        const { provider_id } = response.locals.validated.params as ProviderMonthAvailabilityParams;        

        const { month, year } = response.locals.validated.query as ProviderMonthAvailabilityQuery;
        
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