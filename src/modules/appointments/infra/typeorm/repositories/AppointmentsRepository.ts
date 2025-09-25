import { Repository, Raw } from 'typeorm';
import Appointment from '../entities/Appointment';
import { PostgresDataSource } from '@shared/infra/typeorm';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmensRepository';
import IFindAllInMounthProviderDTO from '@modules/appointments/dtos/IFindAllInMounthProviderDTO';
import IFindAllInDayProviderDTO from '@modules/appointments/dtos/IFindAllInDayProviderDTO';

const customMethods = {

  async findAllInDayFromProvider(this: Repository<Appointment>, {provider_id, month, year, day}: IFindAllInDayProviderDTO): Promise<Appointment[]> {
    const parsedMonth = String(month).padStart(2, '0');
    const parsedDay = String(day).padStart(2, '0');

    const appointments = await this.find({
      where: { 
        provider_id,
        date: Raw(dateFieldname => 
          `to_char(${dateFieldname}, 'DD-MM-YYYY') = '${parsedDay}-${parsedMonth}-${year}'`
        )
      }
    })

    return appointments;
  },

  async findAllInMounthProvider(this: Repository<Appointment>, {provider_id, month, year}: IFindAllInMounthProviderDTO): Promise<Appointment[]> {
    const parsedMonth = String(month).padStart(2, '0');
    
    const appointments = await this.find({
      where: { 
        provider_id,
        date: Raw(dateFieldname => 
          `to_char(${dateFieldname}, 'MM-YYYY') = '${parsedMonth}-${year}'`
        )
      }
    })

    return appointments;
  },

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

};

const appointmentsRepository: Repository<Appointment> & IAppointmentsRepository =
  PostgresDataSource.getRepository(Appointment).extend(customMethods);

export default appointmentsRepository;