import Order from "@modules/orders/infra/typeorm/entities/Order";
import { v4 as uuidV4 } from "uuid";

import AppError from "@shared/errors/AppError";

import FakeStagesRepository from "../repositories/fakes/FakeStagesRepository";
import UpdateStageStatusService from "./UpdateStageStatusService";

let fakeStageRepository: FakeStagesRepository;
let updateStageStatusService: UpdateStageStatusService;

describe("Update a stage status", () => {
  beforeEach(() => {
    fakeStageRepository = new FakeStagesRepository();
    updateStageStatusService = new UpdateStageStatusService(fakeStageRepository);
  });

  it("should be able update a stage status WAITING to STARTED using an existing ID", async () => {
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

    const stage = await updateStageStatusService.execute(id);

    expect(stage).toHaveProperty("id");
    expect(stage.id).toEqual(id);
    expect(stage.status).toEqual("STARTED");
  });

  it("should be able update a stage status STARTED to FINISHED using an existing ID", async () => {
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

    const stage = await updateStageStatusService.execute(id);

    expect(stage).toHaveProperty("id");
    expect(stage.id).toEqual(id);
    expect(stage.status).toEqual("FINISHED");
  });

  it("should not be able update a stage status that already has the FINISHED status", async () => {
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

    await expect(updateStageStatusService.execute(id)).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able update a stage status with a non-existing ID", async () => {
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

    await expect(updateStageStatusService.execute("wrong_id")).rejects.toBeInstanceOf(AppError);
  });
});
