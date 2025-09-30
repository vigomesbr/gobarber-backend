import {Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';
import { CreateAppointmentBody } from '../validators/appointments.validators';

export default class AppointmentsController {
    public async create(request: Request, response: Response): Promise<Response> {
        const { provider_id, date } = response.locals.validated.body as CreateAppointmentBody;
        
        const createAppointment = container.resolve(CreateAppointmentService);
        
        const appointment = await createAppointment.execute({
            date,
            provider_id,
            user_id: request.user.id,
        });

        return response.json(appointment);
    }

    
}