"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddInspectionQuestions1745419701512 = void 0;
class AddInspectionQuestions1745419701512 {
    constructor() {
        this.name = 'AddInspectionQuestions1745419701512';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "inspection_questions" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "response" jsonb NOT NULL, "state_id" bigint NOT NULL, "created_by" integer NOT NULL, CONSTRAINT "PK_0bf82b858a440bf132c41bf0142" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "inspections" ADD "totalScore" double precision NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "inspections" ADD "inspection_result" jsonb`);
        await queryRunner.query(`ALTER TABLE "inspections" ADD "state_id" bigint`);
        await queryRunner.query(`ALTER TABLE "inspections" ADD "query_reasons" jsonb`);
        await queryRunner.query(`ALTER TABLE "inspections" ALTER COLUMN "name" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "inspections" ALTER COLUMN "comment" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "inspections" ALTER COLUMN "month" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "inspections" ALTER COLUMN "year" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "driving_schools" DROP COLUMN "vehicle_types"`);
        await queryRunner.query(`ALTER TABLE "driving_schools" ADD "vehicle_types" jsonb`);
        await queryRunner.query(`ALTER TABLE "inspection_questions" ADD CONSTRAINT "FK_79533ab45a66837ee4f688ca956" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "inspection_questions" DROP CONSTRAINT "FK_79533ab45a66837ee4f688ca956"`);
        await queryRunner.query(`ALTER TABLE "driving_schools" DROP COLUMN "vehicle_types"`);
        await queryRunner.query(`ALTER TABLE "driving_schools" ADD "vehicle_types" text`);
        await queryRunner.query(`ALTER TABLE "inspections" ALTER COLUMN "year" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "inspections" ALTER COLUMN "month" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "inspections" ALTER COLUMN "comment" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "inspections" ALTER COLUMN "name" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "inspections" DROP COLUMN "query_reasons"`);
        await queryRunner.query(`ALTER TABLE "inspections" DROP COLUMN "state_id"`);
        await queryRunner.query(`ALTER TABLE "inspections" DROP COLUMN "inspection_result"`);
        await queryRunner.query(`ALTER TABLE "inspections" DROP COLUMN "totalScore"`);
        await queryRunner.query(`DROP TABLE "inspection_questions"`);
    }
}
exports.AddInspectionQuestions1745419701512 = AddInspectionQuestions1745419701512;
//# sourceMappingURL=1745419701512-add-inspection-questions.js.map