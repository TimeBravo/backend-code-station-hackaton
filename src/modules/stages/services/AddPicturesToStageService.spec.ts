import Order from "@modules/orders/infra/typeorm/entities/Order";
import { v4 as uuidV4 } from "uuid";

import FakeStorageProvider from "@shared/container/providers/storageProvider/fakes/FakeStorageProvider";
import AppError from "@shared/errors/AppError";

import FakeStagesRepository from "../repositories/fakes/FakeStagesRepository";
import AddPicturesToStageService from "./AddPicturesToStageService";

let fakeStageRepository: FakeStagesRepository;
let fakeStorageProvider: FakeStorageProvider;
let addPicturesToStage: AddPicturesToStageService;

describe("Update a stage status", () => {
  beforeEach(() => {
    fakeStageRepository = new FakeStagesRepository();
    fakeStorageProvider = new FakeStorageProvider();
    addPicturesToStage = new AddPicturesToStageService(fakeStageRepository, fakeStorageProvider);
  });

  it("should be able to add pictures to an existing stage", async () => {
    const id = uuidV4();
    await fakeStageRepository.save({
      id,
      name: "uuidV4",
      orderID: "example-order-id",
      photos: [],
      createdAt: new Date(),
      updatedAt: new Date(),
      status: "STARTED",
      order: new Order(),
      description: "test-description",
      getAvatarURL: () => null,
    });

    const fileNames = ["photo_1", "photo_2", "photo_3", "photo_4"];

    const stage = await addPicturesToStage.execute({ stageID: id, fileNames });

    expect(stage).toHaveProperty("id");
    expect(stage.id).toEqual(id);
    expect(stage.photos).toEqual(fileNames);
  });

  it("should not be able add pictures to stage that already the WAITING status", async () => {
    const id = uuidV4();
    await fakeStageRepository.save({
      id,
      name: "uuidV4",
      orderID: "example-order-id",
      photos: [],
      createdAt: new Date(),
      updatedAt: new Date(),
      status: "WAITING",
      order: new Order(),
      description: "test-description",
      getAvatarURL: () => null,
    });

    const fileNames = ["photo_1", "photo_2", "photo_3", "photo_4"];

    await expect(addPicturesToStage.execute({ stageID: id, fileNames })).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able add pictures to stage that already the WAITING status", async () => {
    const id = uuidV4();
    await fakeStageRepository.save({
      id,
      name: "uuidV4",
      orderID: "example-order-id",
      photos: [],
      createdAt: new Date(),
      updatedAt: new Date(),
      status: "FINISHED",
      order: new Order(),
      description: "test-description",
      getAvatarURL: () => null,
    });

    const fileNames = ["photo_1", "photo_2", "photo_3", "photo_4"];
    await expect(addPicturesToStage.execute({ stageID: id, fileNames })).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able add pictures to stage that with worng ID", async () => {
    const id = uuidV4();
    await fakeStageRepository.save({
      id,
      name: "uuidV4",
      orderID: "example-order-id",
      photos: [],
      createdAt: new Date(),
      updatedAt: new Date(),
      status: "STARTED",
      order: new Order(),
      description: "test-description",
      getAvatarURL: () => null,
    });

    const fileNames = ["photo_1", "photo_2", "photo_3", "photo_4"];
    await expect(addPicturesToStage.execute({ stageID: "wrong_id", fileNames })).rejects.toBeInstanceOf(AppError);
  });
});
