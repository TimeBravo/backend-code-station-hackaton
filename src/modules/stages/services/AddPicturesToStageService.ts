import { inject, injectable } from "tsyringe";

import IStorageProvider from "@shared/container/providers/storageProvider/models/IStorageProvider";
import AppError from "@shared/errors/AppError";

import Stage from "../infra/typeorm/entities/Stage";
import IStagesRepository from "../repositories/IStagesRepository";

interface IRequest {
  stageID: string;
  fileNames: string[];
}

@injectable()
export default class AddPicturesToStageService {
  constructor(
    @inject("StagesRepository") private stagesRepository: IStagesRepository,
    @inject("StorageProvider") private storageProvider: IStorageProvider
  ) {}

  public async execute({ stageID, fileNames }: IRequest): Promise<Stage> {
    const stage = await this.stagesRepository.findByID(stageID);

    if (!stage) throw new AppError("Please inform a existing stage ID!");
    if (stage.status !== "STARTED")
      throw new AppError("You can only add image to stages that already started and are not finished");

    const photos = await Promise.all(
      fileNames.map(async (fileName) => {
        const file = await this.storageProvider.saveFile(fileName);
        return file;
      })
    );

    if (!stage.photos) stage.photos = photos;
    else stage.photos.push(...photos);

    await this.stagesRepository.save(stage);

    return stage;
  }
}
