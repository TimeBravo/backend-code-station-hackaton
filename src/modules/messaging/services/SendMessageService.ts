import { inject, injectable } from "tsyringe";

import IMessageProvider from "@shared/container/providers/messageProvider/models/IMessageProvider";

import Message from "../infra/typeorm/entities/Message";

interface IRequest {
  to: string;
  from: string;
  body: string;
}

@injectable()
export default class SendMessageService {
  constructor(@inject("MessageProvider") private messageProvider: IMessageProvider) {}

  public async execute({ to, from, body }: IRequest): Promise<Message> {
    const sentMessage = await this.messageProvider.sendWhatsapp({
      to,
      from,
      message: body,
    });

    return sentMessage;
  }
}
