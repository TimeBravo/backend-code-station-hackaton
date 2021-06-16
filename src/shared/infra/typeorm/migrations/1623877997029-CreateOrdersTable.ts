import { MigrationInterface, QueryRunner, Table } from "typeorm";

export default class CreateOrdersTable1623877997029 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "orders",
        columns: [
          {
            name: "id",
            type: "varchar",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "uuid",
          },
          {
            name: "client_name",
            type: "varchar",
          },
          {
            name: "client_email",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "client_phone",
            type: "varchar",
          },
          {
            name: "product_name",
            type: "varchar",
          },
          {
            name: "is_completed",
            type: "boolean",
            default: false,
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
          {
            name: "updated_at",
            type: "timestamp",
            default: "now()",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("orders");
  }
}
