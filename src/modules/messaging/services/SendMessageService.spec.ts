import FakeMessageProvider from "@shared/container/providers/messageProvider/fakes/FakeMessageProvider";

import SendMessageService from "./SendMessageService";

let fakeMessageProvider: FakeMessageProvider;

let sendMessageService: SendMessageService;

describe("SendWhatsapp", () => {
  beforeEach(() => {
    fakeMessageProvider = new FakeMessageProvider();
    sendMessageService = new SendMessageService(fakeMessageProvider);
  });

  it("should be able to send whatsapp message", async () => {
    const message = await sendMessageService.execute({
      to: "Paul Carter",
      from: "John Doe",
      body: "Hello, I'm sending this message...",
    });

    expect(message.to).toEqual("Paul Carter");
    expect(message.body).toEqual("Hello, I'm sending this message...");
  });
});
