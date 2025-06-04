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
exports.AuditTrailResponseDto = exports.ListAuditTrailDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const all_dto_1 = require("../../core/interfaces/all.dto");
const roles_1 = require("../../middlewares/roles");
class ListAuditTrailDto extends all_dto_1.BaseRequestDto {
}
exports.ListAuditTrailDto = ListAuditTrailDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Role ID of the user', enum: roles_1.Role }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(roles_1.Role),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], ListAuditTrailDto.prototype, "roleId", void 0);
class AuditTrailResponseDto {
}
exports.AuditTrailResponseDto = AuditTrailResponseDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'User ID' }),
    __metadata("design:type", Number)
], AuditTrailResponseDto.prototype, "userId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Database action performed' }),
    __metadata("design:type", String)
], AuditTrailResponseDto.prototype, "dbAction", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Name of the table affected' }),
    __metadata("design:type", String)
], AuditTrailResponseDto.prototype, "tableName", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'ID of the resource affected' }),
    __metadata("design:type", Number)
], AuditTrailResponseDto.prototype, "resourceId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Description of the action' }),
    __metadata("design:type", String)
], AuditTrailResponseDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Timestamp of the action' }),
    __metadata("design:type", Date)
], AuditTrailResponseDto.prototype, "createdAt", void 0);
//# sourceMappingURL=audit-trail.dto.js.map