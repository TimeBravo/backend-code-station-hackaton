import CreateOrderController from "@modules/orders/controllers/CreateOrderController";
import ListOrderController from "@modules/orders/controllers/ListOrderController";
import { Router } from "express";

const ordersRoutes = Router();

const createOrderController = new CreateOrderController();
const listOrderController = new ListOrderController();

ordersRoutes.post("/", createOrderController.handle);
ordersRoutes.get("/", listOrderController.handle);

export default ordersRoutes;
