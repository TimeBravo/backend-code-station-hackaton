export default interface ICreateMessageDTO {
  messageSID: string;

  accountSID?: string;

  messageStatus?:
    | "accepted"
    | "queued"
    | "sending"
    | "sent"
    | "failed"
    | "delivered"
    | "undelivered"
    | "receiving"
    | "received"
    | "read"
    | "scheduled"
    | "partially_delivered";

  from: string;

  to: string;

  body?: string;

  price?: number;

  priceUnit?: string;

  mediaUrl?: string;

  mediaContentType?: string;
}
