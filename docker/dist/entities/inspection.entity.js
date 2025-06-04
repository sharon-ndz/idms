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
exports.Inspection = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./user.entity");
const base_entity_1 = require("./base.entity");
const driving_school_entity_1 = require("./driving-school.entity");
const enums_1 = require("../core/constants/enums");
let Inspection = class Inspection extends base_entity_1.BaseEntity {
};
exports.Inspection = Inspection;
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.Column)({ type: 'bigint', name: 'driving_school_id', nullable: false }),
    __metadata("design:type", Number)
], Inspection.prototype, "drivingSchoolId", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 200, nullable: true }),
    __metadata("design:type", String)
], Inspection.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Inspection.prototype, "comment", void 0);
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.Column)({ enum: enums_1.InspectionStatus, nullable: true }),
    __metadata("design:type", String)
], Inspection.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.Column)({ type: 'int', nullable: true }),
    __metadata("design:type", Number)
], Inspection.prototype, "month", void 0);
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.Column)({ type: 'int', nullable: true }),
    __metadata("design:type", Number)
], Inspection.prototype, "year", void 0);
__decorate([
    (0, typeorm_1.JoinColumn)({ name: 'driving_school_id' }),
    (0, typeorm_1.ManyToOne)(() => driving_school_entity_1.DrivingSchool, (drivingSchool) => drivingSchool.inspections, {
        eager: false,
        nullable: true,
    }),
    __metadata("design:type", driving_school_entity_1.DrivingSchool)
], Inspection.prototype, "drivingSchool", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'created_by' }),
    __metadata("design:type", user_entity_1.User)
], Inspection.prototype, "createdBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float', default: 0 }),
    __metadata("design:type", Number)
], Inspection.prototype, "totalScore", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', name: 'inspection_result', nullable: true }),
    __metadata("design:type", Array)
], Inspection.prototype, "inspectionResult", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'state_id', type: 'bigint', nullable: true }),
    __metadata("design:type", Number)
], Inspection.prototype, "stateId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', name: 'query_reasons', nullable: true }),
    __metadata("design:type", Array)
], Inspection.prototype, "queryReasons", void 0);
exports.Inspection = Inspection = __decorate([
    (0, typeorm_1.Entity)({ name: 'inspections' })
], Inspection);
//# sourceMappingURL=inspection.entity.js.map