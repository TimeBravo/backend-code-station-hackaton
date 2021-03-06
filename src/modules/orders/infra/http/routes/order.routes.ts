import { celebrate, Joi, Segments } from "celebrate";
import { Router } from "express";

import ensureAuthenticated from "@shared/infra/http/middlewares/ensureAuthentication";

import OrderController from "../controllers/OrderController";
import orderDetailsRoutes from "./orderDetails.routes";

const orderRoutes = Router();

const orderController = new OrderController();

orderRoutes.get("/", orderController.index);

orderRoutes.use(orderDetailsRoutes);

orderRoutes.use(ensureAuthenticated);

orderRoutes.post(
  "/",
  celebrate({
    [Segments.BODY]: {
      productName: Joi.string().required(),
      clientName: Joi.string().required(),
      clientPhone: Joi.string()
        .regex(/^\+[1-9]\d{9,14}$/)
        .required(),
      clientEmail: Joi.string().optional(),
      stageList: Joi.array()
        .items({ stageName: Joi.string().required(), stageDescription: Joi.string().required() })
        .required(),
    },
  }),
  orderController.create
);

export default orderRoutes;
