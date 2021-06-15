import { Router } from "express";

import authenticateRoutes from "./authenticate.routes";
import usersRoutes from "./users.routes";

const routes = Router();

routes.use("/users", usersRoutes);
routes.use("/sessions", authenticateRoutes);

export default routes;
