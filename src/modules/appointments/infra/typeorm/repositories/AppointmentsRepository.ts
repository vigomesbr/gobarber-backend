import { Repository } from 'typeorm';
import Appointment from '../entities/Appointment';
import { AppDataSource } from '@shared/infra/typeorm/data-source';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmensRepository';
import IFindAllByProviderDTO from '@modules/appointments/dtos/IFindAllByProviderDTO';

const customMethods = {
  async findByDate(this: Repository<Appointment>, date: Date): Promise<Appointment | null> {
    const findAppointment = await this.findOne({
      where: {
        date,
      },
    });

    return findAppointment;
  },

  async create(this: Repository<Appointment>, data: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = await this.save(data); // Salva no banco de dados
    return appointment;
  },

  async findAllByProvider(this: Repository<Appointment>, { provider_id }: IFindAllByProviderDTO): Promise<Appointment[]> {
    const appointments = this.find({
      where: {
        provider_id,
      },
    });

    return appointments;
  },
};

const appointmentsRepository: Repository<Appointment> & IAppointmentsRepository =
  AppDataSource.getRepository(Appointment).extend(customMethods);

export default appointmentsRepository;