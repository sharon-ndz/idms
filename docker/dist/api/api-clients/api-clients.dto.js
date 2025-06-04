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
exports.ApiClientResetPasswordDto = exports.ApiClientAuthDto = exports.ApiClientUpdateDto = exports.ApiClientCreateDto = exports.ApiClientChangeStatusDto = void 0;
const class_validator_1 = require("class-validator");
const api_client_permission_1 = require("../../middlewares/api-client-permission");
const swagger_1 = require("@nestjs/swagger");
const enums_1 = require("../../core/constants/enums");
const required_dep_1 = require("../../core/validators/required.dep");
class ApiClientChangeStatusDto {
}
exports.ApiClientChangeStatusDto = ApiClientChangeStatusDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], ApiClientChangeStatusDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'number',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsIn)([enums_1.Status.Active, enums_1.Status.Inactive]),
    __metadata("design:type", Number)
], ApiClientChangeStatusDto.prototype, "status", void 0);
class ApiClientCreateDto {
}
exports.ApiClientCreateDto = ApiClientCreateDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], ApiClientCreateDto.prototype, "clientName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsEmail)({}, { message: 'Email is not valid' }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], ApiClientCreateDto.prototype, "clientEmail", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, required_dep_1.IsNGPhoneNumber)(),
    __metadata("design:type", String)
], ApiClientCreateDto.prototype, "clientPhone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'array',
        items: {},
    }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsIn)(Object.values(api_client_permission_1.ApiPermission), { each: true }),
    (0, class_validator_1.IsNotEmpty)({ each: true }),
    __metadata("design:type", Array)
], ApiClientCreateDto.prototype, "permissions", void 0);
class ApiClientUpdateDto {
}
exports.ApiClientUpdateDto = ApiClientUpdateDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], ApiClientUpdateDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], ApiClientUpdateDto.prototype, "clientName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
    }),
    (0, class_validator_1.IsEmail)({}, { message: 'Email is not valid' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], ApiClientUpdateDto.prototype, "clientEmail", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, required_dep_1.IsNGPhoneNumber)(),
    __metadata("design:type", String)
], ApiClientUpdateDto.prototype, "clientPhone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        type: 'array',
        items: {},
    }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsIn)(Object.values(api_client_permission_1.ApiPermission), { each: true }),
    (0, class_validator_1.IsNotEmpty)({ each: true }),
    __metadata("design:type", Array)
], ApiClientUpdateDto.prototype, "permissions", void 0);
class ApiClientAuthDto {
}
exports.ApiClientAuthDto = ApiClientAuthDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], ApiClientAuthDto.prototype, "identity", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], ApiClientAuthDto.prototype, "secret", void 0);
class ApiClientResetPasswordDto {
}
exports.ApiClientResetPasswordDto = ApiClientResetPasswordDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], ApiClientResetPasswordDto.prototype, "id", void 0);
//# sourceMappingURL=api-clients.dto.js.map