import CreateAppointmentService from "./CreateAppointmentService";
import FakeAppointmentsRepository from "../repositories/fakes/FakeAppointmentsRepository";
import ListAppointmentsService from "./ListAppointmentsService";
import AppError from '@shared/errors/AppError';

describe('CreateAppointment', () => {

    let appointmentsRepository: FakeAppointmentsRepository;
    let createAppointment: CreateAppointmentService;
    let listAppointments: ListAppointmentsService;

    beforeEach(() => {
        appointmentsRepository = new FakeAppointmentsRepository();
        createAppointment = new CreateAppointmentService(appointmentsRepository);
        listAppointments = new ListAppointmentsService(appointmentsRepository);

    });

    it('should be able to create a new appointment', async () => {
   
        const appointment = await createAppointment.execute({
            date: new Date(),
            provider_id: '123123123'
        })

        expect(appointment).toHaveProperty('id');
        expect(appointment.provider_id).toBe("123123123");
    });

    it('should not able to create two appointments on the same time', async () => {
        
        const appointmentDate = new Date();

        await createAppointment.execute({
            date: appointmentDate,
            provider_id: '123123123'
        })

        await expect(
            createAppointment.execute({
                date: appointmentDate,
                provider_id: '123123123'
            })
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should be able to list the appointments for a specific provider', async () => {

        const appointment1 = await createAppointment.execute({
            provider_id: 'provider-1',
            date: new Date(2025, 10, 20, 14, 0, 0),
        });

        const appointment2 = await createAppointment.execute({
            provider_id: 'provider-1',
            date: new Date(2025, 10, 20, 15, 0, 0),
        });
        
        await createAppointment.execute({
            provider_id: 'provider-2',
            date: new Date(2025, 10, 21, 10, 0, 0), 
        });

        const appointments = await listAppointments.execute({
            provider_id: 'provider-1',
        });

        expect(appointments).toHaveLength(2);
        expect(appointments).toEqual([appointment1, appointment2]);
    });

});