import ICreateOrderDTO from "@modules/orders/dtos/ICreateOrderDTO";
import Order from "@modules/orders/infra/typeorm/entities/Order";
import IOrdersRepository from "@modules/orders/repositories/IOrdersRepository";
import { injectable, inject } from "tsyringe";

@injectable()
export default class CreateOrderService {
  constructor(
    @inject("OrdersRepository")
    private ordersRepository: IOrdersRepository
  ) {}

  async execute({ clientName, clientEmail, clientPhone, productName }: ICreateOrderDTO): Promise<Order> {
    const order = await this.ordersRepository.create({
      clientName,
      clientEmail,
      clientPhone,
      productName,
    });

    return order;
  }
}
