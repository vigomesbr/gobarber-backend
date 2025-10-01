import { uuid } from 'uuidv4';
import { isEqual, getMonth, getYear, getDate } from 'date-fns';

import IAppointmentsRepository from '../IAppointmensRepository';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';
import Appointment from '../../infra/typeorm/entities/Appointment';
import IFindAllInMounthProviderDTO from '@modules/appointments/dtos/IFindAllInMounthProviderDTO';
import IFindAllInDayProviderDTO from '@modules/appointments/dtos/IFindAllInDayProviderDTO';

class FakeAppointmentsRepository implements IAppointmentsRepository {
  private appointments: Appointment[] = [];

  public async findAllInDayFromProvider({provider_id, day, month, year }: IFindAllInDayProviderDTO): Promise<Appointment[]> {
      const appointments = this.appointments.filter(appointment => 
      appointment.provider_id === provider_id &&
      getDate(appointment.date) === day &&
      getMonth(appointment.date) + 1 === month &&
      getYear(appointment.date) === year
    );

    return appointments
  }

  public async findAllInMonthFromProvider({provider_id, month, year}: IFindAllInMounthProviderDTO): Promise<Appointment[]> {
    const appointments = this.appointments.filter(appointment => 
      appointment.provider_id === provider_id &&
      getMonth(appointment.date) + 1 === month &&
      getYear(appointment.date) === year
    );

    return appointments
  }

  public async findByDate(date: Date, provider_id: string): Promise<Appointment | null> {
    const findAppointment = this.appointments.find(appointment =>
      isEqual(appointment.date, date) &&
      appointment.id === provider_id
    );

    return findAppointment || null;
  }

  public async create(data: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = new Appointment();
    Object.assign(appointment, { id: uuid(), ...data });
    this.appointments.push(appointment);
    return appointment;
  }
}

export default FakeAppointmentsRepository;