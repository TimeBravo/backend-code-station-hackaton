import { Router } from "express";

import OrderDetailsController from "../controllers/OrderDetailsController";

const orderDetailsController = new OrderDetailsController();
const orderDetailsRoutes = Router();

orderDetailsRoutes.get("/:orderID", orderDetailsController.index);

export default orderDetailsRoutes;
