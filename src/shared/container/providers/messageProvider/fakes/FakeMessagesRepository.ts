import ICreateMessageDTO from "@modules/messaging/dtos/ICreateMessageDTO";
import Message from "@modules/messaging/infra/typeorm/entities/Message";
import IMessagesRepository from "@modules/messaging/repositories/IMessagesRepository";
import { v4 as uuidV4 } from "uuid";

class MessagesRepository implements IMessagesRepository {
  private messages: Message[] = [];

  public async create(data: ICreateMessageDTO): Promise<Message> {
    const message = new Message();

    Object.assign(message, { id: uuidV4() }, data);

    this.messages.push(message);

    return message;
  }

  public async getAll(): Promise<Message[]> {
    return this.messages;
  }

  public async getMessageByID(id: string): Promise<Message | undefined> {
    const message = this.messages.find((findedMessage) => findedMessage.id === id);

    return message;
  }

  public async getMessageBySID(messageSID: string): Promise<Message | undefined> {
    const message = this.messages.find((findedMessage) => findedMessage.messageSID === messageSID);

    return message;
  }

  public async save(message: Message): Promise<Message> {
    const findedIndex = this.messages.findIndex((findedMessage) => findedMessage.id === message.id);

    this.messages[findedIndex] = message;

    return message;
  }
}

export default MessagesRepository;
