import AppError from '@shared/errors/AppError';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import ListProvidersAppointmentsService from './ListProvidersAppointmentsService';

describe('ListProviderAppointments', () => {

    let appointmentsRepository: FakeAppointmentsRepository;
    let listProvidersAppointments: ListProvidersAppointmentsService;

    beforeEach(() => {
        appointmentsRepository = new FakeAppointmentsRepository();
        listProvidersAppointments = new ListProvidersAppointmentsService(appointmentsRepository);
    })

    it('should be able to list appointments on especific day', async () => {

        const appointment1 = await appointmentsRepository.create({
            provider_id: 'provider',
            user_id: 'user',
            date: new Date(2025, 7, 20, 8, 0, 0, 0),
        });

        const appointment2 = await appointmentsRepository.create({
            provider_id: 'provider',
            user_id: 'user',
            date: new Date(2025, 7, 20, 9, 0, 0, 0),
        });


        const appointments = await listProvidersAppointments.execute({
            provider_id: 'provider',
            year: 2025,
            month: 8,
            day: 20
        });

        expect(appointments).toEqual([
            appointment1,
            appointment2
        ])
    });

    

});    