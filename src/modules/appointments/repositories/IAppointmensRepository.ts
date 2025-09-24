import Appointment from "../infra/typeorm/entities/Appointment"
import ICreateAppointmentDTO from "../dtos/ICreateAppointmentDTO";
import IFindAllByProviderDTO from "../dtos/IFindAllByProviderDTO";
import IFindAllInMounthProviderDTO from "../dtos/IFindAllInMounthProviderDTO";
import IFindAllInDayProviderDTO from "../dtos/IFindAllInDayProviderDTO";

export default interface IAppointmentsRepository {
    create(data: ICreateAppointmentDTO): Promise<Appointment>;
    findByDate(date: Date): Promise<Appointment | null>;
    findAllByProvider(provider_id: IFindAllByProviderDTO): Promise<Appointment[]>;
    findAllInMounthProvider(data: IFindAllInMounthProviderDTO): Promise<Appointment[]>;
    findAllInDayFromProvider(data: IFindAllInDayProviderDTO): Promise<Appointment[]>;
}