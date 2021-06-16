import ICreateStageDTO from "@modules/stages/dtos/ICreateStageDTO";
import Stage from "@modules/stages/infra/typeorm/entities/Stage";
import IStagesRepository from "@modules/stages/repositories/IStagesRepository";
import { getRepository, Repository } from "typeorm";

export default class StagesRepository implements IStagesRepository {
  private repository: Repository<Stage>;

  constructor() {
    this.repository = getRepository(Stage);
  }

  async create(stageData: ICreateStageDTO): Promise<Stage> {
    const createStage = this.repository.create(stageData);

    const stage = await this.repository.save(createStage);

    return stage;
  }
}
