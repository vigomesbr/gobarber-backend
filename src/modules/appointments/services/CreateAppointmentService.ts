import { startOfHour, isBefore, getHours } from 'date-fns';
import Appointment from '../infra/typeorm/entities/Appointment';
import AppError from '@shared/errors/AppError';
import IAppointmentsRepository from '../repositories/IAppointmensRepository';
import { injectable, inject } from 'tsyringe';

interface Request {
  provider_id: string;
  user_id: string;
  date: Date;
}

@injectable()
class CreateAppointmentService {

  constructor(
    @inject('AppointmentsRepository') 
    private appointmentsRepository: IAppointmentsRepository
  ) {}

  public async execute({ date, provider_id, user_id }: Request): Promise<Appointment> {
    const appointmentDate = startOfHour(date);

    if (isBefore(appointmentDate, Date.now())) {
      throw new AppError("You can't create appointment on a past date")
    }

    if (user_id === provider_id) {
      throw new AppError("You can't create appointment with yourself")
    }

    if (getHours(appointmentDate) < 8 || getHours(appointmentDate) > 17) {
      throw new AppError("You can only creat appointment betweeen 8am and 18am")
    }

    const findAppointmentInSameDate = await this.appointmentsRepository.findByDate(
      appointmentDate,
    );

    if (findAppointmentInSameDate) {
      throw new AppError('This appointment is already booked');
    }


    const appointment = await this.appointmentsRepository.create({
      provider_id,
      user_id,
      date: appointmentDate,
    });

    return appointment;
  }
}

export default CreateAppointmentService;