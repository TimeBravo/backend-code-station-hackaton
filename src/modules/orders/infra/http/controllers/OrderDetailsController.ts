import GetOrderByIDService from "@modules/orders/services/GetOrderByIDSerice";
import { classToClass } from "class-transformer";
import { Request, Response } from "express";
import { container } from "tsyringe";

export default class OrderDetailsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { orderID } = request.params;

    const getOrderService = container.resolve(GetOrderByIDService);

    const order = await getOrderService.execute(orderID);

    return response.json(classToClass(order));
  }
}
