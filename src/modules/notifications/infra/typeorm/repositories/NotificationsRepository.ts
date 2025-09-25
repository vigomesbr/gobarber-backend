import INotificationsRepository from "@modules/notifications/repositories/INotificationsRepository";
import Notification from "../schemas/Notification";
import { MongoDataSource } from "@shared/infra/typeorm";
import { MongoRepository } from "typeorm";
import ICreateNotificationDTO from "@modules/notifications/dtos/ICreateNotificationDTO";

const customMethods = {

    async create(this: MongoRepository<Notification>, { content, recipient_id }: ICreateNotificationDTO): Promise<Notification> {
        const notification = this.save({
            content,
            recipient_id,
        });

        return notification;

    },

};

const notificationsRepository: MongoRepository<Notification> & INotificationsRepository =
  MongoDataSource.getMongoRepository(Notification).extend(customMethods);

export default notificationsRepository;