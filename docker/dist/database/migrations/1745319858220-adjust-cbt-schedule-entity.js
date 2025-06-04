"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdjustCbtScheduleEntity1745319858220 = void 0;
class AdjustCbtScheduleEntity1745319858220 {
    constructor() {
        this.name = 'AdjustCbtScheduleEntity1745319858220';
    }
    async up(queryRunner) {
        await queryRunner.query(`DROP INDEX "public"."IDX_992f2ac79b69765b6533cdb1ba"`);
        await queryRunner.query(`ALTER TABLE "cbt_schedules" ADD "assessed_by" integer`);
        await queryRunner.query(`ALTER TABLE "cbt_schedules" ALTER COLUMN "student_id" TYPE integer`);
        await queryRunner.query(`ALTER TABLE "cbt_schedules" ADD CONSTRAINT "FK_d6ef6a357ce3b9c785347bd4502" FOREIGN KEY ("assessed_by") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "cbt_schedules" ADD CONSTRAINT "FK_992f2ac79b69765b6533cdb1bad" FOREIGN KEY ("student_id") REFERENCES "students"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "cbt_schedules" DROP CONSTRAINT "FK_992f2ac79b69765b6533cdb1bad"`);
        await queryRunner.query(`ALTER TABLE "cbt_schedules" DROP CONSTRAINT "FK_d6ef6a357ce3b9c785347bd4502"`);
        await queryRunner.query(`ALTER TABLE "cbt_schedules" ALTER COLUMN "student_id" TYPE bigint`);
        await queryRunner.query(`ALTER TABLE "cbt_schedules" DROP COLUMN "assessed_by"`);
        await queryRunner.query(`CREATE INDEX "IDX_992f2ac79b69765b6533cdb1ba" ON "cbt_schedules" ("student_id") `);
    }
}
exports.AdjustCbtScheduleEntity1745319858220 = AdjustCbtScheduleEntity1745319858220;
//# sourceMappingURL=1745319858220-adjust-cbt-schedule-entity.js.map