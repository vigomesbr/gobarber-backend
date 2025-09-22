import { uuid } from 'uuidv4';
import { isEqual } from 'date-fns';

import IAppointmentsRepository from '../IAppointmensRepository';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';
import IFindAllByProviderDTO from '@modules/appointments/dtos/IFindAllByProviderDTO';
import Appointment from '../../infra/typeorm/entities/Appointment';

class FakeAppointmentsRepository implements IAppointmentsRepository {
  private appointments: Appointment[] = [];

  public async findByDate(date: Date): Promise<Appointment | null> {
    const findAppointment = this.appointments.find(appointment =>
      isEqual(appointment.date, date),
    );

    return findAppointment || null;
  }

  public async findAllByProvider({ provider_id }: IFindAllByProviderDTO): Promise<Appointment[]> {
    const appointments = this.appointments.filter(
      appointment => appointment.provider_id === provider_id,
    );
    return appointments;
  }

  public async create(data: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = new Appointment();
    Object.assign(appointment, { id: uuid(), ...data });
    this.appointments.push(appointment);
    return appointment;
  }
}

export default FakeAppointmentsRepository;