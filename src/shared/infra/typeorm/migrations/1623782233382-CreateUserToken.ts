import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUserToken1623782233382 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "user_tokens",

        columns: [
          {
            name: "id",

            type: "varchar",

            isPrimary: true,

            generationStrategy: "uuid",
          },

          {
            name: "token",

            type: "varchar",

            generationStrategy: "uuid",
          },

          {
            name: "user_id",

            type: "varchar",
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
            name: "FK_Token_user",

            columnNames: ["user_id"],

            referencedColumnNames: ["id"],

            referencedTableName: "users",

            onDelete: "CASCADE",

            onUpdate: "CASCADE",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("user_tokens");
  }
}
