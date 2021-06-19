import FakeCacheProvider from "@shared/container/providers/cacheProvider/fakes/FakeCacheProvider";
import AppError from "@shared/errors/AppError";

import FakeOrdersRepository from "../repositories/fakes/FakeOrdersRepository";
import CreateOrderService from "./CreateOrderService";

let createOrderService: CreateOrderService;
let ordersRepository: FakeOrdersRepository;
let fakeCacheProvider: FakeCacheProvider;

describe("Create Order Service", () => {
  beforeEach(() => {
    ordersRepository = new FakeOrdersRepository();
    fakeCacheProvider = new FakeCacheProvider();
    createOrderService = new CreateOrderService(ordersRepository, fakeCacheProvider);
  });

  it("should be able to create a new order", async () => {
    const order = await createOrderService.execute({
      clientName: "John Doe",
      clientPhone: "+559999999999",
      productName: "Doe's machines",
      stageList: [
        { stageName: "corte", stageDescription: "Nessa Estapa:\n -Corte de peças e soldagem" },
        { stageName: "dobra", stageDescription: "Nessa Estapa:n\n -Dobra de peças e soldagem" },
        { stageName: "expedição", stageDescription: "Nessa Estapa:\n -Saida da mercadoria" },
      ],
    });

    expect(order).toHaveProperty("id");
    expect(order.productName).toBe("Doe's machines");
  });

  it("should not be able to create a new order with repeated stages", async () => {
    await expect(
      createOrderService.execute({
        clientName: "John Doe",
        clientPhone: "+559999999999",
        productName: "Doe's machines",
        stageList: [
          { stageName: "corte", stageDescription: "Nessa Estapa:\n -Corte de peças e soldagem" },
          { stageName: "corte", stageDescription: "Nessa Estapa:n\n -Corte de peças e soldagem" },
          { stageName: "expedição", stageDescription: "Nessa Estapa:\n -Saida da mercadoria" },
        ],
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to create a new order with an empty stage list", async () => {
    await expect(
      createOrderService.execute({
        clientName: "John Doe",
        clientPhone: "+559999999999",
        productName: "Doe's machines",
        stageList: [],
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
