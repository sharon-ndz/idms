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
exports.PreRegistration = void 0;
const typeorm_1 = require("typeorm");
const enums_1 = require("../core/constants/enums");
const driving_school_entity_1 = require("./driving-school.entity");
const student_entity_1 = require("./student.entity");
const cbt_center_entity_1 = require("./cbt-center.entity");
const cbt_schedule_entity_1 = require("./cbt-schedule.entity");
const user_entity_1 = require("./user.entity");
const base_entity_1 = require("./base.entity");
const license_file_entity_1 = require("./license-file.entity");
const driving_test_center_entity_1 = require("./driving-test-center.entity");
const driving_test_schedule_entity_1 = require("./driving-test-schedule.entity");
let PreRegistration = class PreRegistration extends base_entity_1.BaseEntity {
};
exports.PreRegistration = PreRegistration;
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.Column)({ length: 80, name: 'application_no', nullable: true, unique: true }),
    __metadata("design:type", String)
], PreRegistration.prototype, "applicationNo", void 0);
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.Column)({ type: 'bigint', name: 'student_id', nullable: false }),
    __metadata("design:type", Number)
], PreRegistration.prototype, "studentId", void 0);
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.Column)({ type: 'bigint', name: 'cbt_center_id', nullable: true }),
    __metadata("design:type", Number)
], PreRegistration.prototype, "cbtCenterId", void 0);
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.Column)({ type: 'bigint', name: 'cbt_schedule_id', nullable: true }),
    __metadata("design:type", Number)
], PreRegistration.prototype, "cbtScheduleId", void 0);
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.Column)({ type: 'bigint', name: 'driving_school_id', nullable: true }),
    __metadata("design:type", Number)
], PreRegistration.prototype, "drivingSchoolId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'bigint', name: 'driving_test_center_id', nullable: true }),
    __metadata("design:type", Number)
], PreRegistration.prototype, "drivingTestCenterId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'bigint', name: 'driving_test_schedule_id', nullable: true }),
    __metadata("design:type", Number)
], PreRegistration.prototype, "drivingTestScheduleId", void 0);
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.Column)({ length: 80, nullable: true, unique: true }),
    __metadata("design:type", String)
], PreRegistration.prototype, "reference", void 0);
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.Column)({ nullable: true, name: 'license_class_id' }),
    __metadata("design:type", Number)
], PreRegistration.prototype, "licenseClassId", void 0);
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], PreRegistration.prototype, "years", void 0);
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.Column)({ length: 80, nullable: true, unique: true }),
    __metadata("design:type", String)
], PreRegistration.prototype, "rrr", void 0);
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.Column)({ type: 'int', default: enums_1.PreRegistrationStatus.Pending }),
    __metadata("design:type", Number)
], PreRegistration.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => license_file_entity_1.LicenseFile, (licenseFile) => licenseFile.preRegistration),
    __metadata("design:type", Array)
], PreRegistration.prototype, "licenseFiles", void 0);
__decorate([
    (0, typeorm_1.JoinColumn)({ name: 'driving_school_id' }),
    (0, typeorm_1.ManyToOne)(() => driving_school_entity_1.DrivingSchool, {
        eager: false,
        nullable: true,
    }),
    __metadata("design:type", driving_school_entity_1.DrivingSchool)
], PreRegistration.prototype, "drivingSchool", void 0);
__decorate([
    (0, typeorm_1.JoinColumn)({ name: 'student_id' }),
    (0, typeorm_1.ManyToOne)(() => student_entity_1.Student, {
        eager: false,
        nullable: true,
    }),
    __metadata("design:type", student_entity_1.Student)
], PreRegistration.prototype, "student", void 0);
__decorate([
    (0, typeorm_1.JoinColumn)({ name: 'cbt_center_id' }),
    (0, typeorm_1.ManyToOne)(() => cbt_center_entity_1.CbtCenter, {
        eager: false,
        nullable: true,
    }),
    __metadata("design:type", cbt_center_entity_1.CbtCenter)
], PreRegistration.prototype, "cbtCenter", void 0);
__decorate([
    (0, typeorm_1.JoinColumn)({ name: 'cbt_schedule_id' }),
    (0, typeorm_1.ManyToOne)(() => cbt_schedule_entity_1.CbtSchedule, {
        eager: false,
        nullable: true,
    }),
    __metadata("design:type", cbt_schedule_entity_1.CbtSchedule)
], PreRegistration.prototype, "cbtSchedule", void 0);
__decorate([
    (0, typeorm_1.JoinColumn)({ name: 'driving_test_center_id' }),
    (0, typeorm_1.ManyToOne)(() => driving_test_center_entity_1.DrivingTestCenter, {
        eager: false,
        nullable: true,
    }),
    __metadata("design:type", driving_test_center_entity_1.DrivingTestCenter)
], PreRegistration.prototype, "drivingTestCenter", void 0);
__decorate([
    (0, typeorm_1.JoinColumn)({ name: 'driving_test_schedule_id' }),
    (0, typeorm_1.ManyToOne)(() => driving_test_schedule_entity_1.DrivingTestSchedule, {
        eager: false,
        nullable: true,
    }),
    __metadata("design:type", driving_test_schedule_entity_1.DrivingTestSchedule)
], PreRegistration.prototype, "drivingTestSchedule", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'created_by' }),
    __metadata("design:type", user_entity_1.User)
], PreRegistration.prototype, "createdBy", void 0);
exports.PreRegistration = PreRegistration = __decorate([
    (0, typeorm_1.Entity)({ name: 'pre_registrations' })
], PreRegistration);
//# sourceMappingURL=pre-registration.entity.js.map