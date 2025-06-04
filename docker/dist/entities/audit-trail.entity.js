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
exports.AuditTrail = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./user.entity");
const base_entity_1 = require("./base.entity");
let AuditTrail = class AuditTrail extends base_entity_1.BaseEntity {
};
exports.AuditTrail = AuditTrail;
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.Column)({ type: 'bigint', name: 'user_id', nullable: true }),
    __metadata("design:type", Number)
], AuditTrail.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.auditTrails),
    (0, typeorm_1.JoinColumn)({ name: 'user_id' }),
    __metadata("design:type", user_entity_1.User)
], AuditTrail.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 200, name: 'db_action' }),
    __metadata("design:type", String)
], AuditTrail.prototype, "dbAction", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 250, name: 'table_name' }),
    __metadata("design:type", String)
], AuditTrail.prototype, "tableName", void 0);
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.Column)({ type: 'integer', name: 'resource_id' }),
    __metadata("design:type", Number)
], AuditTrail.prototype, "resourceId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], AuditTrail.prototype, "description", void 0);
exports.AuditTrail = AuditTrail = __decorate([
    (0, typeorm_1.Entity)({ name: 'audit_trails' })
], AuditTrail);
//# sourceMappingURL=audit-trail.entity.js.map