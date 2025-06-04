"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddAdditionalFieldsToApplicantFiles1744892725009 = void 0;
class AddAdditionalFieldsToApplicantFiles1744892725009 {
    constructor() {
        this.name = 'AddAdditionalFieldsToApplicantFiles1744892725009';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "applicant_files" ADD "driving_school_application_id" integer`);
        await queryRunner.query(`ALTER TABLE "applicant_files" ADD CONSTRAINT "FK_1334609961c28d59a274db574de" FOREIGN KEY ("driving_school_application_id") REFERENCES "driving_school_applications"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "applicant_files" DROP CONSTRAINT "FK_1334609961c28d59a274db574de"`);
        await queryRunner.query(`ALTER TABLE "applicant_files" DROP COLUMN "driving_school_application_id"`);
    }
}
exports.AddAdditionalFieldsToApplicantFiles1744892725009 = AddAdditionalFieldsToApplicantFiles1744892725009;
//# sourceMappingURL=1744892725009-add-additional-fields-to-applicant-files.js.map