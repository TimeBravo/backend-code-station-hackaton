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
}
