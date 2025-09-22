import { injectable, inject } from 'tsyringe';
import Appointment from '../infra/typeorm/entities/Appointment';
import IAppointmentsRepository from '../repositories/IAppointmensRepository';

interface Request {
  provider_id: string;
}

@injectable()
class ListAppointmentsService {

  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository
  ) {}

  public async execute({ provider_id }: Request): Promise<Appointment[]> {
    const appointments = await this.appointmentsRepository.findAllByProvider({ provider_id });

    return appointments;
  }
}

export default ListAppointmentsService;