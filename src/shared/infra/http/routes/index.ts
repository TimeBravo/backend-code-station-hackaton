import orderRoutes from "@modules/orders/infra/http/routes/order.routes";
import stageRoutes from "@modules/stages/infra/http/routes/stage.routes";
import sessionRouter from "@modules/users/infra/http/routes/sessions.routes";
import { Router } from "express";

const routes = Router();

routes.use("/authenticate", sessionRouter);
routes.use("/order", orderRoutes);
routes.use("/stage", stageRoutes);

export default routes;
