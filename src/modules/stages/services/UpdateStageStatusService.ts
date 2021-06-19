import IOrdersRepository from "@modules/orders/repositories/IOrdersRepository";
import { inject, injectable } from "tsyringe";

import AppError from "@shared/errors/AppError";

import Stage from "../infra/typeorm/entities/Stage";
import IStagesRepository from "../repositories/IStagesRepository";

@injectable()
export default class UpdateStageStatusService {
  constructor(
    @inject("StagesRepository") private stagesRepository: IStagesRepository,
    @inject("OrdersRepository") private ordersRepository: IOrdersRepository
  ) {}

  public async execute(stageID: string): Promise<Stage> {
    const stage = await this.stagesRepository.findByID(stageID);

    if (!stage) {
      throw new AppError("Please inform a existing stage ID!");
    }

    if (stage.status === "FINISHED") throw new AppError("You can not updated a finished stage");

    if (stage.status === "WAITING")
      throw new AppError("You can not manually start a stage please finish the previous stage");

    stage.status = "FINISHED";

    await this.stagesRepository.save(stage);

    const { order } = stage;

    const stageIndex = order.stages.findIndex((stg) => stg.id === stageID);

    if (stageIndex < order.stages.length - 1) {
      const nextStage = order.stages[stageIndex + 1];

      nextStage.status = "STARTED";

      await this.stagesRepository.save(nextStage);
    } else {
      order.isCompleted = true;
      await this.ordersRepository.save(order);
    }

    return stage;
  }
}
