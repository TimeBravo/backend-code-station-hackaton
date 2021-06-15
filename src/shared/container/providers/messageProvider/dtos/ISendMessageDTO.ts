export default interface ISendMessageDTO {
  to: string;

  from: string;

  message: string;

  mediaUrl?: string;

  mediaContentType?: string;
}
