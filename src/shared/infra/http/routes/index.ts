import orderRoutes from "@modules/orders/infra/http/routes/order.routes";
import sessionRouter from "@modules/users/infra/http/routes/sessions.routes";
import { Router } from "express";

const routes = Router();

routes.use("/authenticate", sessionRouter);
routes.use("/order", orderRoutes);

export default routes;
