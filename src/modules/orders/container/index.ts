import OrdersRepository from "@modules/orders/infra/typeorm/repositories/OrdersRepository";
import IOrdersRepository from "@modules/orders/repositories/IOrdersRepository";
import { container } from "tsyringe";

container.registerSingleton<IOrdersRepository>("OrdersRepository", OrdersRepository);
