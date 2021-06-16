import ICreateOrderDTO from "@modules/orders/dtos/ICreateOrderDTO";
import Order from "@modules/orders/infra/typeorm/entities/Order";

export default interface IOrdersRepository {
  create(data: ICreateOrderDTO): Promise<Order>;
  findById(id: string): Promise<Order | undefined>;
  listOrders(): Promise<Order[]>;
}
