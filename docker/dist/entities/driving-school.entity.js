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
exports.DrivingSchool = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./user.entity");
const base_entity_1 = require("./base.entity");
const driving_school_instructor_entity_1 = require("./driving-school-instructor.entity");
const driving_school_application_query_entity_1 = require("./driving-school-application-query.entity");
const applicant_file_entity_1 = require("./applicant-file.entity");
const inspection_entity_1 = require("./inspection.entity");
let DrivingSchool = class DrivingSchool extends base_entity_1.BaseEntity {
};
exports.DrivingSchool = DrivingSchool;
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.Column)({ length: 50, unique: true, nullable: false }),
    __metadata("design:type", String)
], DrivingSchool.prototype, "identifier", void 0);
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.Column)({ length: 80, nullable: false }),
    __metadata("design:type", String)
], DrivingSchool.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255, nullable: true }),
    __metadata("design:type", String)
], DrivingSchool.prototype, "logo", void 0);
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.Column)({ length: 20, unique: false }),
    __metadata("design:type", String)
], DrivingSchool.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.Column)({ length: 100, unique: true, nullable: true }),
    __metadata("design:type", String)
], DrivingSchool.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], DrivingSchool.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.Column)({ name: 'lga_id', nullable: true }),
    __metadata("design:type", Number)
], DrivingSchool.prototype, "lgaId", void 0);
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.Column)({ name: 'state_id', nullable: true }),
    __metadata("design:type", Number)
], DrivingSchool.prototype, "stateId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'rc_number', length: 30, nullable: true }),
    __metadata("design:type", String)
], DrivingSchool.prototype, "rcNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', name: 'total_vehicles', default: 0 }),
    __metadata("design:type", Number)
], DrivingSchool.prototype, "totalVehicles", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', name: 'vehicle_types', nullable: true }),
    __metadata("design:type", Array)
], DrivingSchool.prototype, "vehicleTypes", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', name: 'special_gadgets', nullable: true }),
    __metadata("design:type", String)
], DrivingSchool.prototype, "specialGadgets", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', name: 'total_simulators', default: 0 }),
    __metadata("design:type", Number)
], DrivingSchool.prototype, "totalSimulators", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'teaching_aids', length: 200, nullable: true }),
    __metadata("design:type", String)
], DrivingSchool.prototype, "teachingAids", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'training_range', length: 100, nullable: true }),
    __metadata("design:type", String)
], DrivingSchool.prototype, "trainingRange", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', name: 'total_classrooms', default: 0 }),
    __metadata("design:type", Number)
], DrivingSchool.prototype, "totalClassrooms", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'classroom_capacity', length: 100, nullable: true }),
    __metadata("design:type", String)
], DrivingSchool.prototype, "classRoomCapacity", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', name: 'total_instructors', default: 0 }),
    __metadata("design:type", Number)
], DrivingSchool.prototype, "totalInstructors", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'doc_type', length: 90, nullable: true }),
    __metadata("design:type", String)
], DrivingSchool.prototype, "docType", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'doc_file', length: 150, nullable: true }),
    __metadata("design:type", String)
], DrivingSchool.prototype, "docFile", void 0);
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.Column)({ name: 'is_active', default: 0 }),
    __metadata("design:type", Number)
], DrivingSchool.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, { nullable: true, eager: false }),
    (0, typeorm_1.JoinColumn)({ name: 'created_by' }),
    __metadata("design:type", user_entity_1.User)
], DrivingSchool.prototype, "createdBy", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => driving_school_instructor_entity_1.DrivingSchoolInstructor, (instructor) => instructor.drivingSchool),
    __metadata("design:type", Array)
], DrivingSchool.prototype, "instructors", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], DrivingSchool.prototype, "reasonForSuspension", void 0);
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.Column)({ length: 80, nullable: true, unique: true }),
    __metadata("design:type", String)
], DrivingSchool.prototype, "reference", void 0);
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], DrivingSchool.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'officer_id', nullable: true }),
    __metadata("design:type", Number)
], DrivingSchool.prototype, "officerId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'officer_id' }),
    __metadata("design:type", user_entity_1.User)
], DrivingSchool.prototype, "officer", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'timestamp',
        name: 'inspection_date',
        nullable: true,
    }),
    __metadata("design:type", Date)
], DrivingSchool.prototype, "inspectionDate", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'timestamp',
        name: 'inspection_end_date',
        nullable: true,
    }),
    __metadata("design:type", Date)
], DrivingSchool.prototype, "inspectionEndDate", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => driving_school_application_query_entity_1.DrivingSchoolApplicationQuery, (query) => query.application),
    __metadata("design:type", Array)
], DrivingSchool.prototype, "queries", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => applicant_file_entity_1.ApplicantFile, (applicantFile) => applicantFile.drivingSchool),
    __metadata("design:type", Array)
], DrivingSchool.prototype, "applicantFiles", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => inspection_entity_1.Inspection, (inspection) => inspection.drivingSchool),
    __metadata("design:type", Array)
], DrivingSchool.prototype, "inspections", void 0);
exports.DrivingSchool = DrivingSchool = __decorate([
    (0, typeorm_1.Entity)({ name: 'driving_schools' })
], DrivingSchool);
//# sourceMappingURL=driving-school.entity.js.map