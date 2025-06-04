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
exports.DrivingSchoolInstructor = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./user.entity");
const base_entity_1 = require("./base.entity");
const driving_school_entity_1 = require("./driving-school.entity");
let DrivingSchoolInstructor = class DrivingSchoolInstructor extends base_entity_1.BaseEntity {
};
exports.DrivingSchoolInstructor = DrivingSchoolInstructor;
__decorate([
    (0, typeorm_1.Column)({ type: 'bigint', name: 'driving_school_id', nullable: false }),
    __metadata("design:type", Number)
], DrivingSchoolInstructor.prototype, "drivingSchoolId", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 150, nullable: false }),
    __metadata("design:type", String)
], DrivingSchoolInstructor.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 150, nullable: true }),
    __metadata("design:type", String)
], DrivingSchoolInstructor.prototype, "avatar", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 20, nullable: false }),
    __metadata("design:type", String)
], DrivingSchoolInstructor.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 100, unique: true, nullable: false }),
    __metadata("design:type", String)
], DrivingSchoolInstructor.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 20, name: 'date_of_birth', nullable: false }),
    __metadata("design:type", String)
], DrivingSchoolInstructor.prototype, "dateOfBirth", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', name: 'gender_id', nullable: false }),
    __metadata("design:type", Number)
], DrivingSchoolInstructor.prototype, "genderId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', name: 'lga_id', nullable: false }),
    __metadata("design:type", Number)
], DrivingSchoolInstructor.prototype, "lgaId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', name: 'state_id', nullable: false }),
    __metadata("design:type", Number)
], DrivingSchoolInstructor.prototype, "stateId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], DrivingSchoolInstructor.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.Column)({ name: 'is_active', default: 0 }),
    __metadata("design:type", Number)
], DrivingSchoolInstructor.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'created_by' }),
    __metadata("design:type", Object)
], DrivingSchoolInstructor.prototype, "createdBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'instructor_id', unique: true, nullable: true }),
    __metadata("design:type", String)
], DrivingSchoolInstructor.prototype, "instructorId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => driving_school_entity_1.DrivingSchool, (drivingSchool) => drivingSchool.instructors),
    (0, typeorm_1.JoinColumn)({ name: 'driving_school_id' }),
    __metadata("design:type", Object)
], DrivingSchoolInstructor.prototype, "drivingSchool", void 0);
exports.DrivingSchoolInstructor = DrivingSchoolInstructor = __decorate([
    (0, typeorm_1.Entity)({ name: 'driving_school_instructors' })
], DrivingSchoolInstructor);
//# sourceMappingURL=driving-school-instructor.entity.js.map