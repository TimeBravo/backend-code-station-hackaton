import ICreateOrderDTO from "@modules/orders/dtos/ICreateOrderDTO";
import Order from "@modules/orders/infra/typeorm/entities/Order";
import IOrdersRepository from "@modules/orders/repositories/IOrdersRepository";
import { getRepository, Repository } from "typeorm";

export default class OrdersRepository implements IOrdersRepository {
  private repository: Repository<Order>;

  constructor() {
    this.repository = getRepository(Order);
  }

  public async findAllOrders(): Promise<Order[]> {
    const orders = await this.repository.find();
    return orders;
  }

  public async create(orderData: ICreateOrderDTO): Promise<Order> {
    const order = this.repository.create(orderData);

    await this.save(order);

    return order;
  }

  public async save(order: Order): Promise<Order> {
    const savedOrder = await this.repository.save(order);

    return savedOrder;
  }

  public async findById(id: string): Promise<Order | undefined> {
    const orderId = await this.repository.findOne(id);

    return orderId;
  }
}
