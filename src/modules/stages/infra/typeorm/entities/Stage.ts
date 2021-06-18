import uploadConfig from "@config/upload";
import Order from "@modules/orders/infra/typeorm/entities/Order";
import { Exclude, Expose } from "class-transformer";
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

  @Exclude()
  @Column({ name: "order_id" })
  orderID: string;

  @Exclude()
  @Column("simple-array")
  photos: string[];

  @Exclude()
  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @Exclude()
  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;

  @Expose({ name: "pictures_url" })
  getAvatarURL(): string[] | null {
    if (!this.photos) return null;
    let baseUrl: string;

    switch (uploadConfig.driver) {
      case "disk":
        baseUrl = `${process.env.APP_API_URL}/files/`;
        break;
      case "s3":
        baseUrl = `https://${uploadConfig.config.aws.bucket}.s3-sa-east-1.amazonaws.com/`;
        break;
      default:
        return null;
    }

    const urls = this.photos.map((pic) => {
      return baseUrl + pic;
    });

    return urls;
  }
}
