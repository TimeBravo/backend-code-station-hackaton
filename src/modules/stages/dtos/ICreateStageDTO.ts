export default interface ICreateStageDTO {
  stageStatus?:
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
}
