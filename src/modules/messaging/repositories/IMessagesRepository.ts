import ICreateMessageDTO from "../dtos/ICreateMessageDTO";
import Message from "../infra/typeorm/entities/Message";

export default interface IMessagesRepository {
  create(data: ICreateMessageDTO): Promise<Message>;

  getAll(): Promise<Message[]>;

  getMessageByID(id: string): Promise<Message | undefined>;

  getMessageBySID(messageSID: string): Promise<Message | undefined>;

  save(message: Message): Promise<Message>;
}
