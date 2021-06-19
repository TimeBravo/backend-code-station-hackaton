import Order from "@modules/orders/infra/typeorm/entities/Order";
import IOrdersRepository from "@modules/orders/repositories/IOrdersRepository";
import { inject, injectable } from "tsyringe";

import ICacheProvider from "@shared/container/providers/cacheProvider/models/ICacheProvider";

@injectable()
export default class ListOrderService {
  constructor(
    @inject("OrdersRepository")
    private ordersRepository: IOrdersRepository,

    @inject("CacheProvider")
    private cacheProvider: ICacheProvider
  ) {}

  async execute(): Promise<Order[]> {
    const cacheKey = `orders`;

    let orders = await this.cacheProvider.recover<Order[]>(cacheKey);

    if (!orders) {
      orders = await this.ordersRepository.findAllOrders();
      await this.cacheProvider.save(cacheKey, orders);
    }

    return orders;
  }
}
