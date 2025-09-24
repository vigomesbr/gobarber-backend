import AppError from '@shared/errors/AppError';
import ListProviderDayAvailabilityService from './ListProviderDayAvailabilityService';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';

describe('ListProviderDayAvailability', () => {

    let appointmentsRepository: FakeAppointmentsRepository;
    let listProviderDayAvailability: ListProviderDayAvailabilityService;

    beforeEach(() => {
        appointmentsRepository = new FakeAppointmentsRepository();
        listProviderDayAvailability = new ListProviderDayAvailabilityService(appointmentsRepository);
    })

    it('should be able to list the day availabillity providers', async () => {

        await appointmentsRepository.create({
            provider_id: 'user',
            date: new Date(2025, 7, 21, 8, 0, 0, 0),
        });

        await appointmentsRepository.create({
            provider_id: 'user',
            date: new Date(2025, 7, 21, 10, 0, 0, 0),
        });

        const availability = await listProviderDayAvailability.execute({
            provider_id: 'user',
            year: 2025,
            month: 8,
            day: 21
        });

        expect(availability).toEqual(expect.arrayContaining([
            { hour: 8, available: false },
            { hour: 9, available: true },
            { hour: 10, available: false },
            { hour: 11, available: true },
        ]))
    });

    

});    