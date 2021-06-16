import ICreateStageDTO from "@modules/stages/dtos/ICreateStageDTO";
import Stage from "@modules/stages/infra/typeorm/entities/Stage";

export default interface IStagesRepository {
  create(status: ICreateStageDTO): Promise<Stage>;
}
