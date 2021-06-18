import AddPicturesToStageService from "@modules/stages/services/AddPicturesToStageService";
import UpdateStageStatusService from "@modules/stages/services/UpdateStageStatusService";
import { classToClass } from "class-transformer";
import { Request, Response } from "express";
import { container } from "tsyringe";

export default class StageController {
  public async update(request: Request, response: Response): Promise<Response> {
    const { stageID } = request.params;

    const updateStageStatusService = container.resolve(UpdateStageStatusService);

    const stage = await updateStageStatusService.execute(stageID);

    return response.json(classToClass(stage));
  }

  public async addPicture(request: Request, response: Response): Promise<Response> {
    const { stageID } = request.params;
    const files = request.files as Express.Multer.File[];
    const fileNames = files.map((file) => file.filename);

    const addPictureService = container.resolve(AddPicturesToStageService);

    const stage = await addPictureService.execute({ stageID, fileNames });

    return response.json(classToClass(stage));
  }
}
