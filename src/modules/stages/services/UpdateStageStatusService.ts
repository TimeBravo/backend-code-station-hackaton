import { inject, injectable } from "tsyringe";

import AppError from "@shared/errors/AppError";

import Stage from "../infra/typeorm/entities/Stage";
import IStagesRepository from "../repositories/IStagesRepository";

@injectable()
export default class UpdateStageStatusService {
  constructor(@inject("StagesRepository") private stageRepository: IStagesRepository) {}

  public async execute(stageID: string): Promise<Stage> {
    const stage = await this.stageRepository.findByID(stageID);

    if (!stage) {
      throw new AppError("Please inform a existing stage ID!");
    }

    if (stage.status === "FINISHED") throw new AppError("You can not updated a finished stage");

    if (stage.status === "WAITING") stage.status = "STARTED";
    else stage.status = "FINISHED";

    await this.stageRepository.save(stage);

    return stage;
  }
}
