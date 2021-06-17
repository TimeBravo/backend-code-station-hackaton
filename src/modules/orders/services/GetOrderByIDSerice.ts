import { inject, injectable } from "tsyringe";

import AppError from "@shared/errors/AppError";

import Order from "../infra/typeorm/entities/Order";
import IOrdersRepository from "../repositories/IOrdersRepository";

@injectable()
export default class GetOrderByIDService {
  constructor(@inject("OrdersRepository") private ordersRepository: IOrdersRepository) {}

  public async execute(orderID: string): Promise<Order> {
    const order = await this.ordersRepository.findById(orderID);
    if (!order) {
      throw new AppError("This order ID do not represent an existing order ID, please inform a valid one!");
    }

    return order;
  }
}
