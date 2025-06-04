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
exports.PaymentSetting = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("./base.entity");
let PaymentSetting = class PaymentSetting extends base_entity_1.BaseEntity {
};
exports.PaymentSetting = PaymentSetting;
__decorate([
    (0, typeorm_1.Column)({ type: 'bigint', name: 'state_id', nullable: false }),
    __metadata("design:type", Number)
], PaymentSetting.prototype, "stateId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'bigint', name: 'lga_id', nullable: false }),
    __metadata("design:type", Number)
], PaymentSetting.prototype, "lgaId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'bigint', name: 'driving_school_id', nullable: true }),
    __metadata("design:type", Number)
], PaymentSetting.prototype, "drivingSchoolId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 100, nullable: false }),
    __metadata("design:type", String)
], PaymentSetting.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', default: 0.0 }),
    __metadata("design:type", Number)
], PaymentSetting.prototype, "amount", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', default: 0.0 }),
    __metadata("design:type", Number)
], PaymentSetting.prototype, "charges", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 150, nullable: false }),
    __metadata("design:type", String)
], PaymentSetting.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 10, nullable: false }),
    __metadata("design:type", String)
], PaymentSetting.prototype, "prefix", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: 1 }),
    __metadata("design:type", Number)
], PaymentSetting.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 3, nullable: false }),
    __metadata("design:type", String)
], PaymentSetting.prototype, "currency", void 0);
exports.PaymentSetting = PaymentSetting = __decorate([
    (0, typeorm_1.Entity)({ name: 'payment_settings' })
], PaymentSetting);
//# sourceMappingURL=payment-setting.entity.js.map