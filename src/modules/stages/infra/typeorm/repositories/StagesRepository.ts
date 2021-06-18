import Stage from "@modules/stages/infra/typeorm/entities/Stage";
import IStagesRepository from "@modules/stages/repositories/IStagesRepository";
import { getRepository, Repository } from "typeorm";

export default class StagesRepository implements IStagesRepository {
  private repository: Repository<Stage>;

  constructor() {
    this.repository = getRepository(Stage);
  }

  public async save(stage: Stage): Promise<Stage> {
    const savedStage = await this.repository.save(stage);
    return savedStage;
  }

  public async findByID(stageID: string): Promise<Stage | undefined> {
    const stage = await this.repository.findOne(stageID, { relations: ["order"] });
    return stage;
  }
}
