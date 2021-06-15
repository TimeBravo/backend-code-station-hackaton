import Message from "@modules/messaging/infra/typeorm/entities/Message";
import IMessagesRepository from "@modules/messaging/repositories/IMessagesRepository";
import { inject, injectable } from "tsyringe";
import { Twilio } from "twilio";

import AppError from "@shared/errors/AppError";

import ISendMessageDTO from "../dtos/ISendMessageDTO";
import IMessageProvider from "../models/IMessageProvider";

@injectable()
export default class TwilioProvider implements IMessageProvider {
  private client: Twilio;

  private accountSID = process.env.TWILIO_ACCOUNT_SID;

  private authToken = process.env.TWILIO_AUTH_TOKEN;

  constructor(
    @inject("MessagesRepository")
    private messagesRepository: IMessagesRepository
  ) {
    if (!this.accountSID || !this.authToken) {
      throw new AppError("Missing credentials to the whatsapp provider");
    }

    this.client = new Twilio(this.accountSID, this.authToken);
  }

  public async sendWhatsapp({ from, to, message, mediaUrl, mediaContentType }: ISendMessageDTO): Promise<Message> {
    const { sid, status, price, priceUnit } = await this.client.messages.create({
      body: message,

      to: `whatsapp:${to}`,

      from: `whatsapp:${from}`,

      mediaUrl,
    });

    const sentMessage: Message = await this.messagesRepository.create({
      accountSID: this.accountSID,

      messageSID: sid,

      messageStatus: status,

      from,

      to,

      price: Number(price),

      priceUnit: priceUnit || "USD",

      body: message,

      mediaUrl,

      mediaContentType,
    });

    return sentMessage;
  }
}
