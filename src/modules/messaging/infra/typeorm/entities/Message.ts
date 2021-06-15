import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity("messages")
export default class Message {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ name: "message_sid", unique: true })
  messageSID: string;

  @Column({ name: "account_sid" })
  accountSID: string;

  @Column({ name: "message_status" })
  messageStatus:
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

  @Column()
  from: string;

  @Column()
  to: string;

  @Column()
  body: string;

  @Column({ type: "decimal", precision: 13, scale: 4 })
  price: number;

  @Column({ name: "price_unit" })
  priceUnit: string;

  @Column({ name: "media_content_type" })
  mediaContentType: string;

  @Column({ name: "original_media_url" })
  originalMediaUrl: string;

  @Column({ name: "media_url" })
  mediaUrl: string;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;
}
