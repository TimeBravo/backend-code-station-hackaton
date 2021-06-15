import ICreateMessageDTO from "@modules/messaging/dtos/ICreateMessageDTO";
import IMessagesRepository from "@modules/messaging/repositories/IMessagesRepository";
import { getRepository, Repository } from "typeorm";

import Message from "../entities/Message";

export default class MessagesRepository implements IMessagesRepository {
  private ormRepository: Repository<Message>;

  constructor() {
    this.ormRepository = getRepository(Message);
  }

  public async create({
    body,

    from,

    to,

    messageSID,

    accountSID,

    messageStatus,

    price,

    priceUnit,

    mediaContentType,

    mediaUrl,
  }: ICreateMessageDTO): Promise<Message> {
    const message = this.ormRepository.create({
      body,
      from,
      to,
      messageStatus,
      messageSID,
      accountSID,
      priceUnit,
      price,
      mediaContentType,
      mediaUrl,
    });

    return this.save(message);
  }

  public async save(message: Message): Promise<Message> {
    const savedMessage = await this.ormRepository.save(message);

    return savedMessage;
  }

  public async getAll(): Promise<Message[]> {
    const messages = await this.ormRepository.find();

    return messages;
  }

  public async getMessageByID(id: string): Promise<Message | undefined> {
    const message = await this.ormRepository.findOne(id);

    return message;
  }

  public async getMessageBySID(messageSID: string): Promise<Message | undefined> {
    const message = await this.ormRepository.findOne({ where: { messageSID } });

    return message;
  }
}
