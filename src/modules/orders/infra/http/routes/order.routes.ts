import { Router } from "express";

import ensureAuthenticated from "@shared/infra/http/middlewares/ensureAuthentication";

import OrderController from "../controllers/OrderController";

const orderRoutes = Router();

const orderController = new OrderController();

orderRoutes.use(ensureAuthenticated);

orderRoutes.post("/", orderController.create);

orderRoutes.get("/", orderController.index);

export default orderRoutes;
