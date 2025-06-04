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
exports.DrivingTestCenter = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("./base.entity");
let DrivingTestCenter = class DrivingTestCenter extends base_entity_1.BaseEntity {
};
exports.DrivingTestCenter = DrivingTestCenter;
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.Column)({ type: 'varchar', length: 50 }),
    __metadata("design:type", String)
], DrivingTestCenter.prototype, "identifier", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 80 }),
    __metadata("design:type", String)
], DrivingTestCenter.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 20 }),
    __metadata("design:type", String)
], DrivingTestCenter.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 70, nullable: true }),
    __metadata("design:type", String)
], DrivingTestCenter.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'lga_id', nullable: true }),
    __metadata("design:type", Number)
], DrivingTestCenter.prototype, "lgaId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'state_id', nullable: true }),
    __metadata("design:type", Number)
], DrivingTestCenter.prototype, "stateId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int' }),
    __metadata("design:type", Number)
], DrivingTestCenter.prototype, "threshold", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int' }),
    __metadata("design:type", Number)
], DrivingTestCenter.prototype, "devices", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true }),
    __metadata("design:type", String)
], DrivingTestCenter.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', name: 'is_active', default: 0 }),
    __metadata("design:type", Number)
], DrivingTestCenter.prototype, "isActive", void 0);
exports.DrivingTestCenter = DrivingTestCenter = __decorate([
    (0, typeorm_1.Entity)({ name: 'driving_test_centers' })
], DrivingTestCenter);
//# sourceMappingURL=driving-test-center.entity.js.map