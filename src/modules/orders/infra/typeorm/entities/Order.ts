import Stage from "@modules/stages/infra/typeorm/entities/Stage";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

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

  @Column({ name: "is_completed" })
  isCompleted: boolean;

  @OneToMany(() => Stage, (stage) => stage.order, { cascade: true })
  stages: Stage[];

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;
}
