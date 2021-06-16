import FakeOrdersRepository from "../repositories/fakes/FakeOrdersRepository";
import CreateOrderService from "./CreateOrderService";

let createOrderService: CreateOrderService;
let ordersRepository: FakeOrdersRepository;

describe("Create Order Service", () => {
  beforeEach(() => {
    ordersRepository = new FakeOrdersRepository();
    createOrderService = new CreateOrderService(ordersRepository);
  });

  it("should be able to create a new order", async () => {
    const order = await createOrderService.execute({
      clientName: "John Doe",
      clientPhone: "+559999999999",
      productName: "Doe's machines",
      stageList: ["corte", "dobra", "expedição"],
    });

    expect(order).toHaveProperty("id");
    expect(order.productName).toBe("Doe's machines");
  });
});
