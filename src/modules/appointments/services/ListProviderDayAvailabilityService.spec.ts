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
            user_id: 'user',
            date: new Date(2025, 7, 25, 14, 0, 0, 0),
        });

        await appointmentsRepository.create({
            provider_id: 'user',
            user_id: 'user',
            date: new Date(2025, 7, 25, 15, 0, 0, 0),
        });

        jest.spyOn(Date, 'now').mockImplementationOnce(() => {
            return new Date(2025, 7, 25, 11).getTime();

        })

        const availability = await listProviderDayAvailability.execute({
            provider_id: 'user',
            year: 2025,
            month: 8,
            day: 25
        });

        expect(availability).toEqual(expect.arrayContaining([
            { hour: 8, available: false },
            { hour: 9, available: false },
            { hour: 10, available: false },
            { hour: 13, available: true },
            { hour: 14, available: false },
            { hour: 15, available: false },
            { hour: 16, available: true },
            { hour: 17, available: true },
        ]))
    });

    

});    