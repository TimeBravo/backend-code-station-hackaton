import OrdersRepository from "@modules/orders/infra/typeorm/repositories/OrdersRepository";
import IOrdersRepository from "@modules/orders/repositories/IOrdersRepository";
import UsersRepository from "@modules/users/infra/typeorm/repositories/UsersRepository";
import IUserRepository from "@modules/users/repositories/IUserRepository";
import { container } from "tsyringe";
import "./providers";
import "@modules/users/providers";

container.registerSingleton<IUserRepository>("UsersRepository", UsersRepository);
container.registerSingleton<IOrdersRepository>("OrdersRepository", OrdersRepository);
