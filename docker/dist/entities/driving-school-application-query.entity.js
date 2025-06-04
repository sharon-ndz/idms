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
exports.DrivingSchoolApplicationQuery = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("./base.entity");
const user_entity_1 = require("./user.entity");
const driving_school_entity_1 = require("./driving-school.entity");
let DrivingSchoolApplicationQuery = class DrivingSchoolApplicationQuery extends base_entity_1.BaseEntity {
};
exports.DrivingSchoolApplicationQuery = DrivingSchoolApplicationQuery;
__decorate([
    (0, typeorm_1.ManyToOne)(() => driving_school_entity_1.DrivingSchool, (application) => application.queries),
    (0, typeorm_1.JoinColumn)({ name: 'driving_school_id' }),
    __metadata("design:type", driving_school_entity_1.DrivingSchool)
], DrivingSchoolApplicationQuery.prototype, "application", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: false }),
    __metadata("design:type", String)
], DrivingSchoolApplicationQuery.prototype, "reason", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'bigint', name: 'queried_by_id', nullable: false }),
    __metadata("design:type", Number)
], DrivingSchoolApplicationQuery.prototype, "queriedById", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, { nullable: false }),
    (0, typeorm_1.JoinColumn)({ name: 'queried_by_id' }),
    __metadata("design:type", user_entity_1.User)
], DrivingSchoolApplicationQuery.prototype, "queriedBy", void 0);
exports.DrivingSchoolApplicationQuery = DrivingSchoolApplicationQuery = __decorate([
    (0, typeorm_1.Entity)({ name: 'driving_school_application_queries' })
], DrivingSchoolApplicationQuery);
//# sourceMappingURL=driving-school-application-query.entity.js.map