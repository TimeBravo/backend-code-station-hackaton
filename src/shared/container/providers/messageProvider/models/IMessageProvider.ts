import Message from "@modules/messaging/infra/typeorm/entities/Message";

import ISendMessageDTO from "../dtos/ISendMessageDTO";

export default interface IMessageProvider {
  sendWhatsapp(data: ISendMessageDTO): Promise<Message>;
}
