import { celebrate, Joi, Segments } from "celebrate";
import { Router } from "express";

import SessionsController from "../controllers/SessionsController";

const controller = new SessionsController();

const sessionRouter = Router();

sessionRouter.post(
  "/",

  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),

  controller.create
);

export default sessionRouter;
