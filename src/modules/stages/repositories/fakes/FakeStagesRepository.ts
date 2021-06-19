import Stage from "@modules/stages/infra/typeorm/entities/Stage";

import IStagesRepository from "../IStagesRepository";

export default class FakeStagesRepository implements IStagesRepository {
  private stages: Stage[] = [];

  public async save(stage: Stage): Promise<Stage> {
    this.stages.push(stage);
    return stage;
  }
  public async findByID(stageID: string): Promise<Stage | undefined> {
    const stage = this.stages.find((stage) => stage.id === stageID);
    return stage;
  }
}
