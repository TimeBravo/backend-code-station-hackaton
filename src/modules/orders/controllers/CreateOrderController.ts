import CreateOrderService from "@modules/orders/services/CreateOrderService";
import { Request, Response } from "express";
import { container } from "tsyringe";

export default class CreateOrderController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { clientName, clientEmail, clientPhone, productName } = request.body;

    const createOrderService = container.resolve(CreateOrderService);

    const order = await createOrderService.execute({
      clientName,
      clientEmail,
      clientPhone,
      productName,
    });

    return response.status(201).json(order);
  }
}
