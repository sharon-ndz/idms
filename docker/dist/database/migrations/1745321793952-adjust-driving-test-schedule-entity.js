"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdjustDrivingTestScheduleEntity1745321793952 = void 0;
class AdjustDrivingTestScheduleEntity1745321793952 {
    constructor() {
        this.name = 'AdjustDrivingTestScheduleEntity1745321793952';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "driving_test_schedules" ALTER COLUMN "pre_registration_id" TYPE integer`);
        await queryRunner.query(`ALTER TABLE "driving_test_schedules" ADD CONSTRAINT "FK_2318bbd77abc42c9ff5bd6c1bcc" FOREIGN KEY ("pre_registration_id") REFERENCES "pre_registrations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "driving_test_schedules" DROP CONSTRAINT "FK_2318bbd77abc42c9ff5bd6c1bcc"`);
        await queryRunner.query(`ALTER TABLE "driving_test_schedules" ALTER COLUMN "pre_registration_id" TYPE bigint`);
    }
}
exports.AdjustDrivingTestScheduleEntity1745321793952 = AdjustDrivingTestScheduleEntity1745321793952;
//# sourceMappingURL=1745321793952-adjust-driving-test-schedule-entity.js.map