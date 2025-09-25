import { ObjectId } from 'mongodb'; 
import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';
import ICreateNotificationDTO from '@modules/notifications/dtos/ICreateNotificationDTO';
import Notification from '../../schemas/Notification';

class FakeNotificationsRepository implements INotificationsRepository {
  private notifications: Notification[] = [];

  public async create({
    content,
    recipient_id,
  }: ICreateNotificationDTO): Promise<Notification> {

    const notification = new Notification();

    Object.assign(notification, {
      id: new ObjectId(), 
      content,
      recipient_id,
      read: false,
      created_at: new Date(),
      updated_at: new Date(),
    });

    this.notifications.push(notification);

    return notification;
  }
}

export default FakeNotificationsRepository;