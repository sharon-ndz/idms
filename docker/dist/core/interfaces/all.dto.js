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
exports.BaseRequestDto = exports.ErrorData = exports.MessageResponseDto = exports.PaymentParam = exports.GetParam = exports.RejectParam = exports.LicenseNoDto = exports.StudentNoDto = exports.ApplicationNoDto = void 0;
exports.beginTransaction = beginTransaction;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const enums_1 = require("../constants/enums");
class ApplicationNoDto {
}
exports.ApplicationNoDto = ApplicationNoDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], ApplicationNoDto.prototype, "applicationId", void 0);
class StudentNoDto {
}
exports.StudentNoDto = StudentNoDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], StudentNoDto.prototype, "studentCertNo", void 0);
class LicenseNoDto {
}
exports.LicenseNoDto = LicenseNoDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], LicenseNoDto.prototype, "licenseNo", void 0);
class RejectParam {
}
exports.RejectParam = RejectParam;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], RejectParam.prototype, "id", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RejectParam.prototype, "reason", void 0);
class GetParam {
}
exports.GetParam = GetParam;
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], GetParam.prototype, "search", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], GetParam.prototype, "resultPerPage", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], GetParam.prototype, "page", void 0);
class PaymentParam {
}
exports.PaymentParam = PaymentParam;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Object)
], PaymentParam.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Object)
], PaymentParam.prototype, "callbackUrl", void 0);
class MessageResponseDto {
}
exports.MessageResponseDto = MessageResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Action status response message' }),
    __metadata("design:type", String)
], MessageResponseDto.prototype, "message", void 0);
class ErrorData {
    constructor(message, details) {
        this.message = message;
        this.details = details;
        Object.setPrototypeOf(this, ErrorData.prototype);
    }
}
exports.ErrorData = ErrorData;
async function beginTransaction(dataSource) {
    const queryRunner = dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    return queryRunner;
}
class BaseRequestDto {
    constructor() {
        this.order = enums_1.Order.DESC;
    }
}
exports.BaseRequestDto = BaseRequestDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateIf)((object, value) => value !== null),
    __metadata("design:type", String)
], BaseRequestDto.prototype, "search", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ default: 10 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateIf)((object, value) => value !== null),
    __metadata("design:type", Number)
], BaseRequestDto.prototype, "resultPerPage", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ default: 1 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateIf)((object, value) => value !== null),
    __metadata("design:type", Number)
], BaseRequestDto.prototype, "page", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: enums_1.Order }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateIf)((object, value) => value !== null),
    __metadata("design:type", String)
], BaseRequestDto.prototype, "order", void 0);
//# sourceMappingURL=all.dto.js.map