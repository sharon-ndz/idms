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
exports.TrainingDuration = void 0;
const typeorm_1 = require("typeorm");
const driving_school_entity_1 = require("./driving-school.entity");
const user_entity_1 = require("./user.entity");
const base_entity_1 = require("./base.entity");
let TrainingDuration = class TrainingDuration extends base_entity_1.BaseEntity {
};
exports.TrainingDuration = TrainingDuration;
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.Column)({ type: 'bigint', name: 'driving_school_id', nullable: false }),
    __metadata("design:type", Number)
], TrainingDuration.prototype, "drivingSchoolId", void 0);
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.Column)({ type: 'int', nullable: false }),
    __metadata("design:type", Number)
], TrainingDuration.prototype, "duration", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 20, name: 'duration_text', nullable: false }),
    __metadata("design:type", String)
], TrainingDuration.prototype, "durationText", void 0);
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.Column)({ name: 'is_active', default: 0 }),
    __metadata("design:type", Number)
], TrainingDuration.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.JoinColumn)({ name: 'driving_school_id' }),
    (0, typeorm_1.ManyToOne)(() => driving_school_entity_1.DrivingSchool, {
        eager: false,
        nullable: true,
    }),
    __metadata("design:type", driving_school_entity_1.DrivingSchool)
], TrainingDuration.prototype, "drivingSchool", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'created_by' }),
    __metadata("design:type", user_entity_1.User)
], TrainingDuration.prototype, "createdBy", void 0);
exports.TrainingDuration = TrainingDuration = __decorate([
    (0, typeorm_1.Entity)({ name: 'training_durations' })
], TrainingDuration);
//# sourceMappingURL=training-duration.entity.js.map