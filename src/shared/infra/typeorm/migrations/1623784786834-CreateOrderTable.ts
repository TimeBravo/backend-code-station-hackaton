import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateOrderTable1623784786834 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "orders",
        columns: [
          {
            name: "id",
            type: "varchar",
            isPrimary: true,
            generationStrategy: "uuid",
          },
          {
            name: "client_name",
            type: "varchar",
          },
          {
            name: "client_email",
            type: "varchar",
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
            name: "status",
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
        foreignKeys: [
          {
            name: "FK_Stage",
            columnNames: ["current_stage"],
            referencedColumnNames: ["id"],
            referencedTableName: "stages",
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("orders");
  }
}
