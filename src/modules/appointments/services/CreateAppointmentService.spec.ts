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
        jest.spyOn(Date, 'now').mockImplementation(() => {
            return new Date(2020, 4, 10, 12).getTime()
        })

        const appointment = await createAppointment.execute({
            date: new Date(2020, 4, 10, 13),
            user_id: '123123',
            provider_id: '123123123'
        })

        expect(appointment).toHaveProperty('id');
        expect(appointment.provider_id).toBe("123123123");
    });

    it('should not able to create two appointments on the same time', async () => {
        

        const appointmentDate = new Date();

        await createAppointment.execute({
            date: appointmentDate,
            user_id: '123123',
            provider_id: '123123123'
        })

        await expect(
            createAppointment.execute({
                date: appointmentDate,
                user_id: '123123',
                provider_id: '123123123'
            })
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should be able to list the appointments for a specific provider', async () => {

        const appointment1 = await createAppointment.execute({
            provider_id: 'provider-1',
            user_id: '123123',
            date: new Date(2025, 10, 20, 14, 0, 0),
        });

        const appointment2 = await createAppointment.execute({
            provider_id: 'provider-1',
            user_id: '123123',
            date: new Date(2025, 10, 20, 15, 0, 0),
        });
        
        await createAppointment.execute({
            provider_id: 'provider-2',
            user_id: '123123',
            date: new Date(2025, 10, 21, 10, 0, 0), 
        });

        const appointments = await listAppointments.execute({
            provider_id: 'provider-1',
        });

        expect(appointments).toHaveLength(2);
        expect(appointments).toEqual([appointment1, appointment2]);
    });

    it('should not able to create appointments on a past date', async () => {
        
        jest.spyOn(Date, 'now').mockImplementationOnce(() => {
            return new Date(2020, 4, 10, 12).getTime()
        })

        await expect(
            createAppointment.execute({
                date: new Date(2020, 4, 10, 11),
                user_id: '123123',
                provider_id: '123123123'
            })
        ).rejects.toBeInstanceOf(AppError);


    });
    
    it('should not able to create appointments with same user as provider', async () => {
        
        jest.spyOn(Date, 'now').mockImplementationOnce(() => {
            return new Date(2020, 4, 10, 12).getTime()
        })

        await expect(
            createAppointment.execute({
                date: new Date(2020, 4, 10, 13),
                user_id: '123123',
                provider_id: '123123'
            })
        ).rejects.toBeInstanceOf(AppError);


    });

    it('should not able to create appointments before 8am and after 6pm', async () => {
        
        jest.spyOn(Date, 'now').mockImplementationOnce(() => {
            return new Date(2020, 4, 10, 12).getTime()
        })

        await expect(
            createAppointment.execute({
                date: new Date(2020, 4, 11, 7),
                user_id: 'user-id',
                provider_id: 'provider-id'
            })
        ).rejects.toBeInstanceOf(AppError);

        await expect(
            createAppointment.execute({
                date: new Date(2020, 4, 11, 18),
                user_id: 'user-id',
                provider_id: 'provider-id'
            })
        ).rejects.toBeInstanceOf(AppError);


    });

});