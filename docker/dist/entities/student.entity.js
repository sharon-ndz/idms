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
exports.Student = void 0;
const typeorm_1 = require("typeorm");
const driving_school_entity_1 = require("./driving-school.entity");
const driving_school_application_entity_1 = require("./driving-school-application.entity");
const user_entity_1 = require("./user.entity");
const base_entity_1 = require("./base.entity");
const permit_entity_1 = require("./permit.entity");
let Student = class Student extends base_entity_1.BaseEntity {
};
exports.Student = Student;
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.Column)({ type: 'bigint', name: 'driving_school_id', nullable: false }),
    __metadata("design:type", Number)
], Student.prototype, "drivingSchoolId", void 0);
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.Column)({ type: 'bigint', name: 'application_id', nullable: false }),
    __metadata("design:type", Number)
], Student.prototype, "applicationId", void 0);
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.Column)({ length: 40, name: 'student_no', nullable: false, unique: true }),
    __metadata("design:type", String)
], Student.prototype, "studentNo", void 0);
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.Column)({ length: 60, name: 'certificate_no', nullable: true, unique: true }),
    __metadata("design:type", String)
], Student.prototype, "certificateNo", void 0);
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.Column)({ name: 'is_active', default: 0 }),
    __metadata("design:type", Number)
], Student.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], Student.prototype, "graduated", void 0);
__decorate([
    (0, typeorm_1.JoinColumn)({ name: 'driving_school_id' }),
    (0, typeorm_1.ManyToOne)(() => driving_school_entity_1.DrivingSchool, {
        eager: false,
        nullable: true,
    }),
    __metadata("design:type", driving_school_entity_1.DrivingSchool)
], Student.prototype, "drivingSchool", void 0);
__decorate([
    (0, typeorm_1.JoinColumn)({ name: 'application_id' }),
    (0, typeorm_1.ManyToOne)(() => driving_school_application_entity_1.DrivingSchoolApplication, {
        eager: false,
        nullable: true,
    }),
    __metadata("design:type", driving_school_application_entity_1.DrivingSchoolApplication)
], Student.prototype, "application", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'created_by' }),
    __metadata("design:type", user_entity_1.User)
], Student.prototype, "createdBy", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => permit_entity_1.Permit, (permit) => permit.student, { eager: true }),
    __metadata("design:type", permit_entity_1.Permit)
], Student.prototype, "permit", void 0);
exports.Student = Student = __decorate([
    (0, typeorm_1.Entity)({ name: 'students' })
], Student);
//# sourceMappingURL=student.entity.js.map