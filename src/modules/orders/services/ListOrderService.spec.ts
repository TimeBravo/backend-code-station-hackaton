import FakeOrdersRepository from "../repositories/fakes/FakeOrdersRepository";
import ListOrderService from "./ListOrderService";

let listOrderService: ListOrderService;
let ordersRepository: FakeOrdersRepository;

describe("List Order Service", () => {
  beforeEach(() => {
    ordersRepository = new FakeOrdersRepository();
    listOrderService = new ListOrderService(ordersRepository);
  });

  it("should be able to list all orders", async () => {
    const order1 = await ordersRepository.create({
      clientName: "John Doe",
      clientPhone: "+559999999999",
      productName: "Doe's machines",
    });
    const order2 = await ordersRepository.create({
      clientName: "John Tree",
      clientPhone: "+559999999999",
      productName: "Doe's machines",
    });
    const order3 = await ordersRepository.create({
      clientName: "John Four",
      clientPhone: "+559999999999",
      productName: "Doe's machines",
    });

    const orders = await listOrderService.execute();

    expect(orders).toEqual([order1, order2, order3]);
  });
});
