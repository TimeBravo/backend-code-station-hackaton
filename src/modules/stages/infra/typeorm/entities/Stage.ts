import Order from "@modules/orders/infra/typeorm/entities/Order";
import { Exclude } from "class-transformer";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("stages")
export default class Stage {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  status: "WAITING" | "STARTED" | "FINISHED" = "WAITING";

  @ManyToOne(() => Order, (order) => order.stages)
  @JoinColumn({ name: "order_id" })
  order: Order;

  @Column({ name: "order_id" })
  orderID: string;

  @Column("simple-array")
  photos: string[];

  @Exclude()
  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @Exclude()
  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;
}
