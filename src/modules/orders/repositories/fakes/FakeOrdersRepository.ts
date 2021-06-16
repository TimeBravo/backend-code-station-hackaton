import ICreateOrderDTO from "@modules/orders/dtos/ICreateOrderDTO";
import Order from "@modules/orders/infra/typeorm/entities/Order";
import IOrdersRepository from "@modules/orders/repositories/IOrdersRepository";
import { v4 as uuidV4 } from "uuid";

export default class FakeOrdersRepository implements IOrdersRepository {
  orders: Order[] = [];

  async findAllOrders(): Promise<Order[]> {
    return this.orders;
  }

  async create(orderData: ICreateOrderDTO): Promise<Order> {
    const order = new Order();

    Object.assign(order, { id: uuidV4() }, orderData);

    this.save(order);

    return order;
  }

  async save(order: Order): Promise<Order> {
    this.orders.push(order);
    return order;
  }

  async findById(id: string): Promise<Order | undefined> {
    return this.orders.find((order) => order.id === id);
  }
}
