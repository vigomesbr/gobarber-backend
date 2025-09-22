import Appointment from "../infra/typeorm/entities/Appointment"
import ICreateAppointmentDTO from "../dtos/ICreateAppointmentDTO";
import IFindAllByProviderDTO from "../dtos/IFindAllByProviderDTO";

export default interface IAppointmentsRepository {
    create(data: ICreateAppointmentDTO): Promise<Appointment>;
    findByDate(date: Date): Promise<Appointment | null>;
    findAllByProvider(provider_id: IFindAllByProviderDTO): Promise<Appointment[]>;
}