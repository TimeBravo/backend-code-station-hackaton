import { Router } from "express";

import ensureAuthenticated from "@shared/infra/http/middlewares/ensureAuthentication";

import StageController from "../controllers/StageController";

const stageController = new StageController();

const stageRoutes = Router();

stageRoutes.put("/:stageID", stageController.update);

stageRoutes.use(ensureAuthenticated);

export default stageRoutes;
