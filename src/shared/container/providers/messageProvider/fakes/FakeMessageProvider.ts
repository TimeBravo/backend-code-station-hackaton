import Message from "@modules/messaging/infra/typeorm/entities/Message";

import ISendMessageDTO from "../dtos/ISendMessageDTO";
import IMessageProvider from "../models/IMessageProvider";

class FakeMessageProvider implements IMessageProvider {
  public async sendWhatsapp(data: ISendMessageDTO): Promise<Message> {
    const message = new Message();

    message.to = data.to;

    message.from = data.from;

    message.body = data.message;

    return message;
  }
}

export default FakeMessageProvider;
