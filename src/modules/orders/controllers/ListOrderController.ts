import ListOrderService from "@modules/orders/services/ListOrderService";
import { Request, Response } from "express";
import { container } from "tsyringe";

export default class ListOrderController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listOrderService = container.resolve(ListOrderService);

    const all = await listOrderService.execute();

    return response.json(all);
  }
}
