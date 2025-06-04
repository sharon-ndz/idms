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
exports.UpdatePasswordRequestDto = exports.ResetPasswordDto = exports.OTPDataDto = exports.SendOTPDataDto = exports.AuthUserDto = exports.TestNinRequestDto = exports.AuthEmailDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const constants_1 = require("../../core/constants/constants");
const messages_1 = require("../../core/constants/messages");
const required_dep_1 = require("../../core/validators/required.dep");
class AuthEmailDto {
}
exports.AuthEmailDto = AuthEmailDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], AuthEmailDto.prototype, "email", void 0);
class TestNinRequestDto {
}
exports.TestNinRequestDto = TestNinRequestDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], TestNinRequestDto.prototype, "nin", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", String)
], TestNinRequestDto.prototype, "data", void 0);
class AuthUserDto extends AuthEmailDto {
}
exports.AuthUserDto = AuthUserDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], AuthUserDto.prototype, "password", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], AuthUserDto.prototype, "fingerType", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], AuthUserDto.prototype, "deviceId", void 0);
class SendOTPDataDto {
}
exports.SendOTPDataDto = SendOTPDataDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        description: 'Email address to receive the otp',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEmail)({}, { message: 'Email is not valid' }),
    __metadata("design:type", String)
], SendOTPDataDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        description: 'Phone number to receive the otp. One of phone or email should be set but not both',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, required_dep_1.IsNGPhoneNumber)(),
    __metadata("design:type", String)
], SendOTPDataDto.prototype, "phone", void 0);
class OTPDataDto extends SendOTPDataDto {
}
exports.OTPDataDto = OTPDataDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        maxLength: 6,
        minLength: 6,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(6, 6),
    __metadata("design:type", String)
], OTPDataDto.prototype, "otp", void 0);
__decorate([
    (0, swagger_1.ApiHideProperty)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], OTPDataDto.prototype, "deleteOTP", void 0);
class ResetPasswordDto extends SendOTPDataDto {
}
exports.ResetPasswordDto = ResetPasswordDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        maxLength: 6,
        minLength: 6,
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.Length)(6, 6),
    __metadata("design:type", String)
], ResetPasswordDto.prototype, "otp", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MinLength)(8),
    __metadata("design:type", String)
], ResetPasswordDto.prototype, "password", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], ResetPasswordDto.prototype, "confirmPassword", void 0);
class UpdatePasswordRequestDto {
}
exports.UpdatePasswordRequestDto = UpdatePasswordRequestDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], UpdatePasswordRequestDto.prototype, "oldPassword", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.Matches)(new RegExp(constants_1.PASSWORD_REGEX), {
        message: messages_1.MESSAGES.passwordStrengthFailed,
    }),
    __metadata("design:type", String)
], UpdatePasswordRequestDto.prototype, "password", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.Matches)(new RegExp(constants_1.PASSWORD_REGEX), {
        message: messages_1.MESSAGES.passwordStrengthFailed,
    }),
    __metadata("design:type", String)
], UpdatePasswordRequestDto.prototype, "confirmPassword", void 0);
__decorate([
    (0, swagger_1.ApiHideProperty)(),
    __metadata("design:type", Number)
], UpdatePasswordRequestDto.prototype, "userId", void 0);
//# sourceMappingURL=auth.dto.js.map