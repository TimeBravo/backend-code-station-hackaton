import uploadConfig from "@config/upload";
import { Router } from "express";
import multer from "multer";

import ensureAuthenticated from "@shared/infra/http/middlewares/ensureAuthentication";

import StageController from "../controllers/StageController";

const upload = multer(uploadConfig.multer);

const stageController = new StageController();

const stageRoutes = Router();

stageRoutes.put("/:stageID", stageController.update);

stageRoutes.patch("/:stageID", upload.array("report_images"), stageController.addPicture);

stageRoutes.use(ensureAuthenticated);

export default stageRoutes;
