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
exports.NewPermitRequestDto = exports.PermitClassDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const enums_1 = require("../../core/constants/enums");
const constants_1 = require("../../core/constants/constants");
const messages_1 = require("../../core/constants/messages");
const required_dep_1 = require("../../core/validators/required.dep");
class PermitClassDto {
}
exports.PermitClassDto = PermitClassDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsIn)(constants_1.permitClasses.map((p) => p.id.toString()), {
        message: messages_1.MESSAGES.invalidValue('permit class'),
    }),
    __metadata("design:type", String)
], PermitClassDto.prototype, "permitClassId", void 0);
class NewPermitRequestDto {
}
exports.NewPermitRequestDto = NewPermitRequestDto;
__decorate([
    (0, swagger_1.ApiHideProperty)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], NewPermitRequestDto.prototype, "requestType", void 0);
__decorate([
    (0, swagger_1.ApiHideProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], NewPermitRequestDto.prototype, "reference", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsEnum)(enums_1.PermitClassType),
    __metadata("design:type", Number)
], NewPermitRequestDto.prototype, "permitClassId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], NewPermitRequestDto.prototype, "years", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], NewPermitRequestDto.prototype, "studentNo", void 0);
__decorate([
    (0, swagger_1.ApiHideProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], NewPermitRequestDto.prototype, "permitNo", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsEmail)({}, { message: 'Email is not valid' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], NewPermitRequestDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, required_dep_1.IsNGPhoneNumber)(),
    __metadata("design:type", String)
], NewPermitRequestDto.prototype, "phone", void 0);
//# sourceMappingURL=permit.dto.js.map