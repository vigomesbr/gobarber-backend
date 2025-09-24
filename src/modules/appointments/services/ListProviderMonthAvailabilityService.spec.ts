import AppError from '@shared/errors/AppError';
import ListProviderMonthAvailabilityService from './ListProviderMonthAvailabilityService';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';

describe('ListProviderMounthAvallability', () => {

    let appointmentsRepository: FakeAppointmentsRepository;
    let listProvidersMounthAvallbility: ListProviderMonthAvailabilityService;

    beforeEach(() => {
        appointmentsRepository = new FakeAppointmentsRepository();
        listProvidersMounthAvallbility = new ListProviderMonthAvailabilityService(appointmentsRepository);
    })

    it('should be able to list the mounth availabillity providers', async () => {

        await appointmentsRepository.create({
            provider_id: 'user',
            user_id: 'user',
            date: new Date(2025, 7, 20, 8, 0, 0, 0),
        });

        await appointmentsRepository.create({
            provider_id: 'user',
            user_id: 'user',
            date: new Date(2025, 7, 20, 9, 0, 0, 0),
        });

        await appointmentsRepository.create({
            provider_id: 'user',
            user_id: 'user',
            date: new Date(2025, 7, 20, 10, 0, 0, 0),
        });

        await appointmentsRepository.create({
            provider_id: 'user',
            user_id: 'user',
            date: new Date(2025, 7, 20, 11, 0, 0, 0),
        });

        await appointmentsRepository.create({
            provider_id: 'user',
            user_id: 'user',
            date: new Date(2025, 7, 20, 12, 0, 0, 0),
        });

        await appointmentsRepository.create({
            provider_id: 'user',
            user_id: 'user',
            date: new Date(2025, 7, 20, 13, 0, 0, 0),
        });

        await appointmentsRepository.create({
            provider_id: 'user',
            user_id: 'user',
            date: new Date(2025, 7, 20, 14, 0, 0, 0),
        });

        await appointmentsRepository.create({
            provider_id: 'user',
            user_id: 'user',
            date: new Date(2025, 7, 20, 15, 0, 0, 0),
        });

        await appointmentsRepository.create({
            provider_id: 'user',
            user_id: 'user',
            date: new Date(2025, 7, 20, 16, 0, 0, 0),
        });

        await appointmentsRepository.create({
            provider_id: 'user',
            user_id: 'user',
            date: new Date(2025, 7, 20, 17, 0, 0, 0),
        });

        await appointmentsRepository.create({
            provider_id: 'user',
            user_id: 'user',
            date: new Date(2025, 7, 21, 8, 0, 0, 0),
        });

        const availability = await listProvidersMounthAvallbility.execute({
            provider_id: 'user',
            year: 2025,
            month: 8
        });

        expect(availability).toEqual(expect.arrayContaining([
            { day: 19, available: true },
            { day: 20, available: false },
            { day: 21, available: true },
            { day: 22, available: true },
        ]))
    });

    

});    