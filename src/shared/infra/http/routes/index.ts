import sessionRouter from "@modules/users/infra/http/routes/sessions.routes";
import { Router } from "express";

const routes = Router();

routes.use("/authenticate", sessionRouter);

export default routes;
