import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("stages")
export default class Order {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ name: "stage_status" })
  stageStatus:
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

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;
}
