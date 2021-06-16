import { Router } from "express";

import ordersRoutes from "./orders.routes";

const routes = Router();

routes.use("/orders", ordersRoutes);

export default routes;
