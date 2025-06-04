"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplicantFile = void 0;
const typeorm_1 = require("typeorm");
const file_entity_1 = require("./file.entity");
const base_entity_1 = require("./base.entity");
const enums_1 = require("../core/constants/enums");
const driving_school_entity_1 = require("./driving-school.entity");
const driving_school_application_entity_1 = require("./driving-school-application.entity");
let ApplicantFile = class ApplicantFile extends base_entity_1.BaseEntity {
};
exports.ApplicantFile = ApplicantFile;
__decorate([
    (0, typeorm_1.Column)({ name: 'document_type', type: 'varchar', length: 40, nullable: true }),
    __metadata("design:type", String)
], ApplicantFile.prototype, "documentType", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'finger_type', length: 90, nullable: true }),
    __metadata("design:type", String)
], ApplicantFile.prototype, "fingerType", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => driving_school_application_entity_1.DrivingSchoolApplication, (drivingSchoolApplication) => drivingSchoolApplication.applicantFiles, {
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION',
    }),
    (0, typeorm_1.JoinColumn)([{ name: 'driving_school_application_id', referencedColumnName: 'id' }]),
    __metadata("design:type", driving_school_application_entity_1.DrivingSchoolApplication)
], ApplicantFile.prototype, "drivingSchoolApplication", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => driving_school_entity_1.DrivingSchool, (drivingSchool) => drivingSchool.applicantFiles, {
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION',
    }),
    (0, typeorm_1.JoinColumn)([{ name: 'driving_school_id', referencedColumnName: 'id' }]),
    __metadata("design:type", driving_school_entity_1.DrivingSchool)
], ApplicantFile.prototype, "drivingSchool", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => file_entity_1.File, (file) => file.applicantFiles, {
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION',
    }),
    (0, typeorm_1.JoinColumn)([{ name: 'file_id', referencedColumnName: 'id' }]),
    __metadata("design:type", Object)
], ApplicantFile.prototype, "file", void 0);
exports.ApplicantFile = ApplicantFile = __decorate([
    (0, typeorm_1.Entity)({ name: 'applicant_files' })
], ApplicantFile);
//# sourceMappingURL=applicant-file.entity.js.map