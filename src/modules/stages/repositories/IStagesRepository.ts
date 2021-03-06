import Stage from "@modules/stages/infra/typeorm/entities/Stage";

export default interface IStagesRepository {
  save(stage: Stage): Promise<Stage>;
  findByID(stageID: string): Promise<Stage | undefined>;
}
