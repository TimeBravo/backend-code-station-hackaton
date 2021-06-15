import { MigrationInterface, QueryRunner, Table } from "typeorm";

export default class CreateMessageTable1623703440599 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "messages",

        columns: [
          {
            name: "id",

            type: "varchar",

            isGenerated: true,

            generationStrategy: "uuid",
          },

          {
            name: "message_sid",

            type: "varchar",

            isUnique: true,
          },

          {
            name: "account_sid",

            type: "varchar",
          },

          {
            name: "message_status",

            type: "varchar",

            default: '"accepted"',
          },

          {
            name: "from",

            type: "varchar",
          },

          {
            name: "to",

            type: "varchar",
          },

          {
            name: "price",

            type: "decimal(13, 4)",

            default: 0,
          },

          {
            name: "price_unit",

            type: "varchar",

            default: '"USD"',
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
    await queryRunner.dropTable("messages");
  }
}
