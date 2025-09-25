import { container } from "tsyringe";

import '@modules/users/providers';
import './providers'

import IAppointmentsRepository from "@modules/appointments/repositories/IAppointmensRepository";
import appointmentsRepository from "@modules/appointments/infra/typeorm/repositories/AppointmentsRepository";

import IUsersRepository from "@modules/users/repositories/IUsersRepository";
import usersRepository from "@modules/users/infra/typeorm/repositories/UsersRepository";

import IUserTokenRepository from "@modules/users/repositories/IUserTokenRepository";
import userTokensRepository from "@modules/users/infra/typeorm/repositories/UserTokensRepository";

import INotificationsRepository from "@modules/notifications/repositories/INotificationsRepository";
import notificationsRepository from "@modules/notifications/infra/typeorm/repositories/NotificationsRepository";

container.register<IAppointmentsRepository>(
    'AppointmentsRepository',
    {
        useValue: appointmentsRepository 
    }
);

container.register<IUsersRepository>(
    'UsersRepository',
    {
        useValue: usersRepository 
    }
);

container.register<IUserTokenRepository>(
    'UserTokenRepository',
    {
        useValue: userTokensRepository 
    }
);

container.register<INotificationsRepository>(
    'NotificationsRepository',
    {
        useValue: notificationsRepository 
    }
);