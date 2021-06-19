import Order from "@modules/orders/infra/typeorm/entities/Order";
import FakeOrdersRepository from "@modules/orders/repositories/fakes/FakeOrdersRepository";
import { v4 as uuidV4 } from "uuid";

import AppError from "@shared/errors/AppError";

import FakeStagesRepository from "../repositories/fakes/FakeStagesRepository";
import UpdateStageStatusService from "./UpdateStageStatusService";

let fakeStageRepository: FakeStagesRepository;
let updateStageStatusService: UpdateStageStatusService;
let fakeOrdersRepository: FakeOrdersRepository;

describe("Update a stage status", () => {
  beforeEach(() => {
    fakeStageRepository = new FakeStagesRepository();
    fakeOrdersRepository = new FakeOrdersRepository();
    updateStageStatusService = new UpdateStageStatusService(fakeStageRepository, fakeOrdersRepository);
  });

  it("should be able update a stage status STARTED to FINISHED using an existing ID", async () => {
    const id = uuidV4();
    const order = await fakeOrdersRepository.create({
      clientName: "john doe",
      clientPhone: "+551799999999",
      productName: "Maquina de teste",
      clientEmail: "johndoe@gmail.com",
    });

    const stage = await fakeStageRepository.save({
      id,
      name: "uuidV4",
      orderID: "example-order-id",
      photos: [],
      createdAt: new Date(),
      updatedAt: new Date(),
      status: "STARTED",
      order,
      description: "test-description",
      getAvatarURL: () => null,
    });

    order.stages = [stage];

    await fakeOrdersRepository.save(order);

    const updatedStage = await updateStageStatusService.execute(id);

    expect(updatedStage).toHaveProperty("id");
    expect(updatedStage.id).toEqual(id);
    expect(updatedStage.status).toEqual("FINISHED");
  });

  it("should be able update the next stage to the status STARTED", async () => {
    const order = await fakeOrdersRepository.create({
      clientName: "john doe",
      clientPhone: "+551799999999",
      productName: "Maquina de teste",
      clientEmail: "johndoe@gmail.com",
    });

    const id = uuidV4();
    const stage1 = await fakeStageRepository.save({
      id,
      name: "uuidV4",
      orderID: "example-order-id",
      photos: [],
      createdAt: new Date(),
      updatedAt: new Date(),
      status: "STARTED",
      order,
      description: "test-description",
      getAvatarURL: () => null,
    });

    const id2 = uuidV4();
    const stage2 = await fakeStageRepository.save({
      id: id2,
      name: "uuidV4",
      orderID: "example-order-id",
      photos: [],
      createdAt: new Date(),
      updatedAt: new Date(),
      status: "WAITING",
      order,
      description: "test-description",
      getAvatarURL: () => null,
    });

    order.stages = [stage1, stage2];

    await fakeOrdersRepository.save(order);

    await updateStageStatusService.execute(id);

    expect(order.stages[1]).toHaveProperty("id");
    expect(order.stages[1].id).toEqual(id2);
    expect(order.stages[1].status).toEqual("STARTED");
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
