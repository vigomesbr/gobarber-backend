import { container } from "tsyringe";

import '@modules/users/providers';
import './providers'

import IAppointmentsRepository from "@modules/appointments/repositories/IAppointmensRepository";
import appointmentsRepository from "@modules/appointments/infra/typeorm/repositories/AppointmentsRepository";

import IUsersRepository from "@modules/users/repositories/IUsersRepository";
import usersRepository from "@modules/users/infra/typeorm/repositories/UsersRepository";

import IUserTokenRepository from "@modules/users/repositories/IUserTokenRepository";
import userTokensRepository from "@modules/users/infra/typeorm/repositories/UserTokensRepository";

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