"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddDrivingTestCenterMigration1745322244759 = void 0;
class AddDrivingTestCenterMigration1745322244759 {
    constructor() {
        this.name = 'AddDrivingTestCenterMigration1745322244759';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "driving_test_schedules" ALTER COLUMN "driving_test_center_id" TYPE integer`);
        await queryRunner.query(`ALTER TABLE "driving_test_schedules" ADD CONSTRAINT "FK_92ae409ad5c69395b110e63c9c6" FOREIGN KEY ("driving_test_center_id") REFERENCES "driving_test_centers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "driving_test_schedules" DROP CONSTRAINT "FK_92ae409ad5c69395b110e63c9c6"`);
        await queryRunner.query(`ALTER TABLE "driving_test_schedules" ALTER COLUMN "driving_test_center_id" TYPE bigint`);
    }
}
exports.AddDrivingTestCenterMigration1745322244759 = AddDrivingTestCenterMigration1745322244759;
//# sourceMappingURL=1745322244759-add-driving-test-center-migration.js.map