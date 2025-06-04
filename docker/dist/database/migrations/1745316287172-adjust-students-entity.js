"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdjustStudentsEntity1745316287172 = void 0;
class AdjustStudentsEntity1745316287172 {
    constructor() {
        this.name = 'AdjustStudentsEntity1745316287172';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "students" DROP CONSTRAINT "FK_7d7f07271ad4ce999880713f05e"`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "students" ADD CONSTRAINT "FK_7d7f07271ad4ce999880713f05e" FOREIGN KEY ("id") REFERENCES "permits"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
}
exports.AdjustStudentsEntity1745316287172 = AdjustStudentsEntity1745316287172;
//# sourceMappingURL=1745316287172-adjust-students-entity.js.map