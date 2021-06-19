import Stage from "@modules/stages/infra/typeorm/entities/Stage";
import { v4 as uuidV4 } from "uuid";

import AppError from "@shared/errors/AppError";

import FakeOrdersRepository from "../repositories/fakes/FakeOrdersRepository";
import GetOrderByIDService from "./GetOrderByIDService";

let ordersRepository: FakeOrdersRepository;
let getOrderByID: GetOrderByIDService;

describe("Create Order Service", () => {
  beforeEach(() => {
    ordersRepository = new FakeOrdersRepository();

    getOrderByID = new GetOrderByIDService(ordersRepository);
  });

  it("should retrieve a order passing the right ID", async () => {
    const id = uuidV4();
    await ordersRepository.save({
      id,
      clientName: "John Doe",
      clientPhone: "+559999999999",
      productName: "Doe's machines",
      stages: [new Stage()],
      clientEmail: "johndoe@example.com",
      isCompleted: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const order = await getOrderByID.execute(id);

    expect(order).toHaveProperty("id");
    expect(order.productName).toBe("Doe's machines");
  });

  it("should not retrieve a order passing a non-existing ID", async () => {
    const id = uuidV4();
    await ordersRepository.save({
      id,
      clientName: "John Doe",
      clientPhone: "+559999999999",
      productName: "Doe's machines",
      stages: [new Stage()],
      clientEmail: "johndoe@example.com",
      isCompleted: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await expect(getOrderByID.execute("example-text")).rejects.toBeInstanceOf(AppError);
  });
});
