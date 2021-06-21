import SendMessageService from "@modules/messaging/services/SendMessageService";
import CreateOrderService from "@modules/orders/services/CreateOrderService";
import ListOrderService from "@modules/orders/services/ListOrderService";
import { classToClass } from "class-transformer";
import { Request, Response } from "express";
import { container } from "tsyringe";

export default class OrderController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { clientName, clientEmail, clientPhone, productName, stageList } = request.body;

    const createOrderService = container.resolve(CreateOrderService);

    const order = await createOrderService.execute({
      clientName,
      clientEmail,
      clientPhone,
      productName,
      stageList,
    });

    const sendMessageService = container.resolve(SendMessageService);

    const body = `Olá ${order.clientName}, seu pedido de id ${order.id} foi registrado a primeira etapa é ${order.stages[0].name} acesse o link https://stageview.herokuapp.com/order/${order.id} para visualizar seu pedido`;

    await sendMessageService.execute({ to: order.clientPhone, from: "+14155238886", body });

    return response.status(201).json(classToClass(order));
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const listOrderService = container.resolve(ListOrderService);

    const orders = await listOrderService.execute();

    return response.json(classToClass(orders));
  }
}
