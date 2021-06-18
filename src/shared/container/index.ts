import IMessagesRepository from "@modules/messaging/repositories/IMessagesRepository";
import OrdersRepository from "@modules/orders/infra/typeorm/repositories/OrdersRepository";
import IOrdersRepository from "@modules/orders/repositories/IOrdersRepository";
import StagesRepository from "@modules/stages/infra/typeorm/repositories/StagesRepository";
import IStagesRepository from "@modules/stages/repositories/IStagesRepository";
import UsersRepository from "@modules/users/infra/typeorm/repositories/UsersRepository";
import IUserRepository from "@modules/users/repositories/IUserRepository";
import { container } from "tsyringe";
import "./providers";
import "@modules/users/providers";

import MessagesRepository from "./providers/messageProvider/fakes/FakeMessagesRepository";

container.registerSingleton<IUserRepository>("UsersRepository", UsersRepository);
container.registerSingleton<IOrdersRepository>("OrdersRepository", OrdersRepository);
container.registerSingleton<IStagesRepository>("StagesRepository", StagesRepository);
container.registerSingleton<IMessagesRepository>("MessagesRepository", MessagesRepository);
