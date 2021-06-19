import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export default class AddDescriptionFieldToStageTable1624116749773 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "stages",
      new TableColumn({
        name: "description",
        type: "varchar",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn("stages", "description");
  }
}
