import ICreateOrderDTO from "@modules/orders/dtos/ICreateOrderDTO";
import Order from "@modules/orders/infra/typeorm/entities/Order";
import IOrdersRepository from "@modules/orders/repositories/IOrdersRepository";
import { getRepository, Repository } from "typeorm";

export default class OrdersRepository implements IOrdersRepository {
  private repository: Repository<Order>;

  constructor() {
    this.repository = getRepository(Order);
  }

  async create(orderData: ICreateOrderDTO): Promise<Order> {
    const createOrder = this.repository.create(orderData);

    const order = await this.repository.save(createOrder);

    return order;
  }

  async findById(id: string): Promise<Order | undefined> {
    const orderId = await this.repository.findOne(id);

    return orderId;
  }
}
