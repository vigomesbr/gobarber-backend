import {Request, Response } from 'express';
import { container } from 'tsyringe';
import ListProviderDayAvailabilityService from '@modules/appointments/services/ListProviderDayAvailabilityService';
import AppError from '@shared/errors/AppError';
import {
  ProviderDayAvailabilityParams,
  ProviderDayAvailabilityQuery,
} from '../validators/providers.validators';

export default class ProviderDayAvailabilityController {
    public async index(request: Request, response: Response): Promise<Response> {

        const { provider_id } = response.locals.validated.params as ProviderDayAvailabilityParams;
        const { month, year, day } =  response.locals.validated.query as ProviderDayAvailabilityQuery;
        const listProviderDayAvailability = container.resolve(ListProviderDayAvailabilityService);
        
        if (!provider_id) {
            throw new AppError('Provider ID must be provided in the URL.', 400);
        }

        const availability = await listProviderDayAvailability.execute({
            provider_id,
            month,
            year,
            day
        });


        return response.json(availability);
    }
    
}