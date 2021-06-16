import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity("orders")
export default class Order {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ name: "client_name" })
  clientName: string;

  @Column({ name: "client_email" })
  clientEmail: string;

  @Column({ name: "client_phone" })
  clientPhone: string;

  @Column({ name: "product_name" })
  productName: string;

  @Column()
  status: boolean;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;
}
