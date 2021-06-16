import Order from "@modules/orders/infra/typeorm/entities/Order";
import IOrdersRepository from "@modules/orders/repositories/IOrdersRepository";
import Stage from "@modules/stages/infra/typeorm/entities/Stage";
import { injectable, inject } from "tsyringe";

import AppError from "@shared/errors/AppError";

interface IRequest {
  clientName: string;
  clientEmail?: string;
  clientPhone: string;
  productName: string;
  stageList: string[];
}

@injectable()
export default class CreateOrderService {
  constructor(
    @inject("OrdersRepository")
    private ordersRepository: IOrdersRepository
  ) {}

  public async execute({ clientName, clientEmail, clientPhone, productName, stageList }: IRequest): Promise<Order> {
    const existsDuplicatedStage = stageList.some((element, index) => {
      return stageList.indexOf(element.toLowerCase()) !== index;
    });

    if (existsDuplicatedStage) throw new AppError("You cannot add a new order with duplicated stages");

    const order = await this.ordersRepository.create({
      clientName,
      clientEmail,
      clientPhone,
      productName,
    });

    const stages = stageList.map((stageName) => {
      const stage = new Stage();
      stage.name = stageName;
      stage.orderID = order.id;
      return stage;
    });

    order.stages = stages;

    await this.ordersRepository.save(order);

    return order;
  }
}
