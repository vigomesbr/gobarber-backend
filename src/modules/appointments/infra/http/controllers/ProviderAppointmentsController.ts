import {Request, Response } from 'express';
import { container } from 'tsyringe';
import ListProvidersAppointmentsService from '@modules/appointments/services/ListProvidersAppointmentsService';
import { ListProviderAppointmentsBody } from '../validators/appointments.validators';

export default class ProviderAppointmentsController {
    public async index(request: Request, response: Response): Promise<Response> {
        
        const { month, day, year } = request.body as ListProviderAppointmentsBody;
        
        const listProvidersAppointments = container.resolve(ListProvidersAppointmentsService);
        
        const appointments = await listProvidersAppointments.execute({
            provider_id: request.user.id, 
            month, 
            day, 
            year
        });

        return response.json(appointments);
    }

    
}