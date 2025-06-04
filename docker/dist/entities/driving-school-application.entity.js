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
exports.DrivingSchoolApplication = void 0;
const typeorm_1 = require("typeorm");
const driving_school_entity_1 = require("./driving-school.entity");
const training_duration_entity_1 = require("./training-duration.entity");
const user_entity_1 = require("./user.entity");
const base_entity_1 = require("./base.entity");
const enums_1 = require("../core/constants/enums");
const student_entity_1 = require("./student.entity");
const applicant_file_entity_1 = require("./applicant-file.entity");
let DrivingSchoolApplication = class DrivingSchoolApplication extends base_entity_1.BaseEntity {
};
exports.DrivingSchoolApplication = DrivingSchoolApplication;
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.Column)({ type: 'bigint', name: 'driving_school_id', nullable: false }),
    __metadata("design:type", Number)
], DrivingSchoolApplication.prototype, "drivingSchoolId", void 0);
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.Column)({ type: 'int', name: 'training_duration_id', nullable: false }),
    __metadata("design:type", Number)
], DrivingSchoolApplication.prototype, "trainingDurationId", void 0);
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.Column)({ length: 80, nullable: false, unique: true }),
    __metadata("design:type", String)
], DrivingSchoolApplication.prototype, "reference", void 0);
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.Column)({ length: 20, nullable: false }),
    __metadata("design:type", String)
], DrivingSchoolApplication.prototype, "nin", void 0);
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.Column)({ length: 40, name: 'application_no', nullable: false, unique: true }),
    __metadata("design:type", String)
], DrivingSchoolApplication.prototype, "applicationNo", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', name: 'title_id', nullable: false }),
    __metadata("design:type", Number)
], DrivingSchoolApplication.prototype, "titleId", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 50, name: 'first_name', nullable: false }),
    __metadata("design:type", String)
], DrivingSchoolApplication.prototype, "firstName", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 50, name: 'middle_name', nullable: true }),
    __metadata("design:type", String)
], DrivingSchoolApplication.prototype, "middleName", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 50, name: 'last_name', nullable: false }),
    __metadata("design:type", String)
], DrivingSchoolApplication.prototype, "lastName", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 50, name: 'maiden_name', nullable: false }),
    __metadata("design:type", String)
], DrivingSchoolApplication.prototype, "maidenName", void 0);
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.Column)({ length: 60, nullable: false }),
    __metadata("design:type", String)
], DrivingSchoolApplication.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.Column)({ length: 20, nullable: true }),
    __metadata("design:type", String)
], DrivingSchoolApplication.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', name: 'gender_id', nullable: false }),
    __metadata("design:type", Number)
], DrivingSchoolApplication.prototype, "genderId", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 20, name: 'date_of_birth', nullable: false }),
    __metadata("design:type", String)
], DrivingSchoolApplication.prototype, "dateOfBirth", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 80, name: 'place_of_birth', nullable: false }),
    __metadata("design:type", String)
], DrivingSchoolApplication.prototype, "placeOfBirth", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'nationality_id', nullable: false }),
    __metadata("design:type", Number)
], DrivingSchoolApplication.prototype, "nationalityId", void 0);
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.Column)({ name: 'state_of_origin_id', nullable: false }),
    __metadata("design:type", Number)
], DrivingSchoolApplication.prototype, "stateOfOriginId", void 0);
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.Column)({ name: 'lga_of_origin_id', nullable: false }),
    __metadata("design:type", Number)
], DrivingSchoolApplication.prototype, "lgaOfOriginId", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255, nullable: true }),
    __metadata("design:type", String)
], DrivingSchoolApplication.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', name: 'occupation_id', nullable: false }),
    __metadata("design:type", Number)
], DrivingSchoolApplication.prototype, "occupationId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', name: 'marital_status_id', nullable: false }),
    __metadata("design:type", Number)
], DrivingSchoolApplication.prototype, "maritalStatusId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', name: 'blood_group_id', nullable: false }),
    __metadata("design:type", Number)
], DrivingSchoolApplication.prototype, "bloodGroupId", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 100, name: 'next_of_kin_name', nullable: false }),
    __metadata("design:type", String)
], DrivingSchoolApplication.prototype, "nextOfKinName", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 20, name: 'next_of_kin_phone', nullable: false }),
    __metadata("design:type", String)
], DrivingSchoolApplication.prototype, "nextOfKinPhone", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', name: 'next_of_kin_relationship_id', nullable: false }),
    __metadata("design:type", Number)
], DrivingSchoolApplication.prototype, "nextOfKinRelationshipId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', name: 'next_of_kin_nationality_id', nullable: false }),
    __metadata("design:type", Number)
], DrivingSchoolApplication.prototype, "nextOfKinNationalityId", void 0);
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.Column)({ default: enums_1.Reg.Pending }),
    __metadata("design:type", Number)
], DrivingSchoolApplication.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 50, name: 'course_level', default: enums_1.CourseLevel.Beginner }),
    __metadata("design:type", String)
], DrivingSchoolApplication.prototype, "courseLevel", void 0);
__decorate([
    (0, typeorm_1.JoinColumn)({ name: 'driving_school_id' }),
    (0, typeorm_1.ManyToOne)(() => driving_school_entity_1.DrivingSchool, {
        eager: false,
        nullable: true,
    }),
    __metadata("design:type", driving_school_entity_1.DrivingSchool)
], DrivingSchoolApplication.prototype, "drivingSchool", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => student_entity_1.Student, (student) => student.application),
    __metadata("design:type", Object)
], DrivingSchoolApplication.prototype, "student", void 0);
__decorate([
    (0, typeorm_1.JoinColumn)({ name: 'training_duration_id' }),
    (0, typeorm_1.ManyToOne)(() => training_duration_entity_1.TrainingDuration, {
        eager: false,
        nullable: true,
    }),
    __metadata("design:type", training_duration_entity_1.TrainingDuration)
], DrivingSchoolApplication.prototype, "trainingDuration", void 0);
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.Column)({ type: 'bigint', name: 'approved_by_id', nullable: true }),
    __metadata("design:type", Number)
], DrivingSchoolApplication.prototype, "approvedById", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'timestamp',
        name: 'approved_at',
        nullable: true,
    }),
    __metadata("design:type", Date)
], DrivingSchoolApplication.prototype, "approvedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'created_by' }),
    __metadata("design:type", user_entity_1.User)
], DrivingSchoolApplication.prototype, "createdBy", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => applicant_file_entity_1.ApplicantFile, (applicantFile) => applicantFile.drivingSchoolApplication),
    __metadata("design:type", Array)
], DrivingSchoolApplication.prototype, "applicantFiles", void 0);
exports.DrivingSchoolApplication = DrivingSchoolApplication = __decorate([
    (0, typeorm_1.Entity)({ name: 'driving_school_applications' })
], DrivingSchoolApplication);
//# sourceMappingURL=driving-school-application.entity.js.map