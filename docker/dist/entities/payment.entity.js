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
exports.Payment = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("./base.entity");
const enums_1 = require("../core/constants/enums");
let Payment = class Payment extends base_entity_1.BaseEntity {
};
exports.Payment = Payment;
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.Column)({ type: 'bigint', name: 'user_id', nullable: true }),
    __metadata("design:type", Number)
], Payment.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.Column)({ length: 100, nullable: false }),
    __metadata("design:type", String)
], Payment.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', default: 0.0 }),
    __metadata("design:type", Number)
], Payment.prototype, "amount", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 10 }),
    __metadata("design:type", String)
], Payment.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.Column)({ length: 40, unique: true }),
    __metadata("design:type", String)
], Payment.prototype, "reference", void 0);
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.Column)({ length: 20, nullable: true }),
    __metadata("design:type", String)
], Payment.prototype, "channel", void 0);
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.Column)({ length: 40, nullable: false }),
    __metadata("design:type", String)
], Payment.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.Column)({ length: 3, nullable: false }),
    __metadata("design:type", String)
], Payment.prototype, "currency", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: false }),
    __metadata("design:type", String)
], Payment.prototype, "log", void 0);
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.Column)({ length: 40, name: 'item_type', nullable: false }),
    __metadata("design:type", String)
], Payment.prototype, "itemType", void 0);
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.Column)({ type: 'bigint', name: 'item_id', nullable: true }),
    __metadata("design:type", Number)
], Payment.prototype, "itemId", void 0);
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.Column)({ length: 30, nullable: false }),
    __metadata("design:type", String)
], Payment.prototype, "provider", void 0);
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.Column)({ type: 'smallint', default: enums_1.Reference.Unused }),
    __metadata("design:type", Number)
], Payment.prototype, "used", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', default: 0.0 }),
    __metadata("design:type", Number)
], Payment.prototype, "charges", void 0);
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.Column)({ type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], Payment.prototype, "refunded", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', name: 'success_redirect_url', length: 250, nullable: true }),
    __metadata("design:type", String)
], Payment.prototype, "successRedirectUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', name: 'failure_redirect_url', length: 250, nullable: true }),
    __metadata("design:type", String)
], Payment.prototype, "failureRedirectUrl", void 0);
exports.Payment = Payment = __decorate([
    (0, typeorm_1.Entity)({ name: 'transactions' })
], Payment);
//# sourceMappingURL=payment.entity.js.map