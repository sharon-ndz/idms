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
exports.MobileReplaceLicenseRequestDto = exports.ReplaceLicenseRequestDto = exports.MobileRenewalLicenseRequestDto = exports.RenewalLicenseRequestDto = exports.NewLicenseRequestDto = exports.RenewalPreRegistrationDto = exports.PreRegistrationRequestDto = exports.AttachFilesDto = exports.ValidateLicenseDto = exports.ExpireLicenseDto = exports.UpdateLicenseDto = exports.ApproveLicenseDto = exports.LicenseStatsWithYearDto = exports.LicenseStatsDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const cbt_dto_1 = require("../cbt/cbt.dto");
const constants_1 = require("../../core/constants/constants");
const enums_1 = require("../../core/constants/enums");
const messages_1 = require("../../core/constants/messages");
const required_dep_1 = require("../../core/validators/required.dep");
class LicenseStatsDto {
}
exports.LicenseStatsDto = LicenseStatsDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsEnum)(enums_1.LicenseStatType),
    __metadata("design:type", String)
], LicenseStatsDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(enums_1.LicenseStatus),
    __metadata("design:type", String)
], LicenseStatsDto.prototype, "status", void 0);
class LicenseStatsWithYearDto extends LicenseStatsDto {
}
exports.LicenseStatsWithYearDto = LicenseStatsWithYearDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], LicenseStatsWithYearDto.prototype, "year", void 0);
class ApproveLicenseDto {
}
exports.ApproveLicenseDto = ApproveLicenseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        required: true,
    }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], ApproveLicenseDto.prototype, "licenseId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsIn)(constants_1.licenseClasses.map((l) => l.id), { message: messages_1.MESSAGES.invalidValue('license class') }),
    __metadata("design:type", Number)
], ApproveLicenseDto.prototype, "licenseClassId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], ApproveLicenseDto.prototype, "years", void 0);
class UpdateLicenseDto {
}
exports.UpdateLicenseDto = UpdateLicenseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        required: true,
    }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], UpdateLicenseDto.prototype, "licenseId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsEnum)(enums_1.LicenseStatus),
    __metadata("design:type", String)
], UpdateLicenseDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsEnum)(enums_1.Status),
    __metadata("design:type", Number)
], UpdateLicenseDto.prototype, "isActive", void 0);
class ExpireLicenseDto {
}
exports.ExpireLicenseDto = ExpireLicenseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        required: true,
    }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], ExpireLicenseDto.prototype, "licenseId", void 0);
class ValidateLicenseDto {
}
exports.ValidateLicenseDto = ValidateLicenseDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ValidateLicenseDto.prototype, "licenseNo", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ValidateLicenseDto.prototype, "drivingCertNo", void 0);
class AttachFilesDto {
}
exports.AttachFilesDto = AttachFilesDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], AttachFilesDto.prototype, "applicationNo", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], AttachFilesDto.prototype, "files", void 0);
class PreRegistrationRequestDto extends cbt_dto_1.CbtScheduleDto {
}
exports.PreRegistrationRequestDto = PreRegistrationRequestDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        required: true,
    }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], PreRegistrationRequestDto.prototype, "cbtCenterId", void 0);
__decorate([
    (0, swagger_1.ApiHideProperty)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], PreRegistrationRequestDto.prototype, "cbtScheduleId", void 0);
__decorate([
    (0, swagger_1.ApiHideProperty)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], PreRegistrationRequestDto.prototype, "studentId", void 0);
__decorate([
    (0, swagger_1.ApiHideProperty)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], PreRegistrationRequestDto.prototype, "drivingSchoolId", void 0);
__decorate([
    (0, swagger_1.ApiHideProperty)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], PreRegistrationRequestDto.prototype, "drivingTestScheduleId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsIn)(constants_1.licenseClasses.map((l) => l.id), { message: messages_1.MESSAGES.invalidValue('license class') }),
    __metadata("design:type", Number)
], PreRegistrationRequestDto.prototype, "licenseClassId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], PreRegistrationRequestDto.prototype, "years", void 0);
__decorate([
    (0, swagger_1.ApiHideProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], PreRegistrationRequestDto.prototype, "rrr", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: true,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], PreRegistrationRequestDto.prototype, "certificateNo", void 0);
__decorate([
    (0, swagger_1.ApiHideProperty)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], PreRegistrationRequestDto.prototype, "applicationNo", void 0);
__decorate([
    (0, swagger_1.ApiHideProperty)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], PreRegistrationRequestDto.prototype, "direct", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], PreRegistrationRequestDto.prototype, "files", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: true }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], PreRegistrationRequestDto.prototype, "successRedirectUrl", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: true }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], PreRegistrationRequestDto.prototype, "failureRedirectUrl", void 0);
class RenewalPreRegistrationDto extends cbt_dto_1.CbtScheduleDto {
}
exports.RenewalPreRegistrationDto = RenewalPreRegistrationDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        required: true,
    }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], RenewalPreRegistrationDto.prototype, "drivingTestCenterId", void 0);
__decorate([
    (0, swagger_1.ApiHideProperty)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], RenewalPreRegistrationDto.prototype, "drivingTestScheduleId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], RenewalPreRegistrationDto.prototype, "oldLicenseNo", void 0);
__decorate([
    (0, swagger_1.ApiHideProperty)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], RenewalPreRegistrationDto.prototype, "studentId", void 0);
__decorate([
    (0, swagger_1.ApiHideProperty)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], RenewalPreRegistrationDto.prototype, "drivingSchoolId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsIn)(constants_1.licenseClasses.map((l) => l.id), { message: messages_1.MESSAGES.invalidValue('license class') }),
    __metadata("design:type", Number)
], RenewalPreRegistrationDto.prototype, "licenseClassId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], RenewalPreRegistrationDto.prototype, "years", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsEnum)(enums_1.Sources, { each: true }),
    __metadata("design:type", String)
], RenewalPreRegistrationDto.prototype, "source", void 0);
__decorate([
    (0, swagger_1.ApiHideProperty)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], RenewalPreRegistrationDto.prototype, "applicationNo", void 0);
__decorate([
    (0, swagger_1.ApiHideProperty)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], RenewalPreRegistrationDto.prototype, "direct", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], RenewalPreRegistrationDto.prototype, "files", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: true }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], RenewalPreRegistrationDto.prototype, "successRedirectUrl", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: true }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], RenewalPreRegistrationDto.prototype, "failureRedirectUrl", void 0);
class NewLicenseRequestDto {
}
exports.NewLicenseRequestDto = NewLicenseRequestDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        required: true,
    }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], NewLicenseRequestDto.prototype, "weight", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: true,
    }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], NewLicenseRequestDto.prototype, "height", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: true,
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], NewLicenseRequestDto.prototype, "eyes", void 0);
__decorate([
    (0, swagger_1.ApiHideProperty)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], NewLicenseRequestDto.prototype, "requestType", void 0);
__decorate([
    (0, swagger_1.ApiHideProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], NewLicenseRequestDto.prototype, "reference", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsIn)(constants_1.licenseClasses.map((l) => l.id), { message: messages_1.MESSAGES.invalidValue('license class') }),
    __metadata("design:type", Number)
], NewLicenseRequestDto.prototype, "licenseClassId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], NewLicenseRequestDto.prototype, "years", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], NewLicenseRequestDto.prototype, "applicationNo", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsEmail)({}, { message: 'Email is not valid' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], NewLicenseRequestDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, required_dep_1.IsNGPhoneNumber)(),
    __metadata("design:type", String)
], NewLicenseRequestDto.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsIn)(constants_1.nationalities.map((n) => n.id), { message: messages_1.MESSAGES.invalidValue('nationality') }),
    __metadata("design:type", Number)
], NewLicenseRequestDto.prototype, "nationalityId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsIn)(constants_1.states.map((s) => s.id), { message: messages_1.MESSAGES.invalidValue('state of origin') }),
    __metadata("design:type", Number)
], NewLicenseRequestDto.prototype, "stateId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsIn)(constants_1.lgas.map((l) => l.id), { message: messages_1.MESSAGES.invalidValue('lga of origin') }),
    __metadata("design:type", Number)
], NewLicenseRequestDto.prototype, "lgaId", void 0);
class RenewalLicenseRequestDto {
}
exports.RenewalLicenseRequestDto = RenewalLicenseRequestDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        required: true,
    }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], RenewalLicenseRequestDto.prototype, "weight", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: true,
    }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], RenewalLicenseRequestDto.prototype, "height", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: true,
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RenewalLicenseRequestDto.prototype, "eyes", void 0);
__decorate([
    (0, swagger_1.ApiHideProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], RenewalLicenseRequestDto.prototype, "reference", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsIn)(constants_1.licenseClasses.map((l) => l.id), { message: messages_1.MESSAGES.invalidValue('license class') }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], RenewalLicenseRequestDto.prototype, "licenseClassId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], RenewalLicenseRequestDto.prototype, "years", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], RenewalLicenseRequestDto.prototype, "oldLicenseNo", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], RenewalLicenseRequestDto.prototype, "applicationNo", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsEmail)({}, { message: 'Email is not valid' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], RenewalLicenseRequestDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, required_dep_1.IsNGPhoneNumber)(),
    __metadata("design:type", String)
], RenewalLicenseRequestDto.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsIn)(constants_1.nationalities.map((n) => n.id), { message: messages_1.MESSAGES.invalidValue('nationality') }),
    __metadata("design:type", Number)
], RenewalLicenseRequestDto.prototype, "nationalityId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsIn)(constants_1.states.map((s) => s.id), { message: messages_1.MESSAGES.invalidValue('state of origin') }),
    __metadata("design:type", Number)
], RenewalLicenseRequestDto.prototype, "stateId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsIn)(constants_1.lgas.map((l) => l.id), { message: messages_1.MESSAGES.invalidValue('lga of origin') }),
    __metadata("design:type", Number)
], RenewalLicenseRequestDto.prototype, "lgaId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsEnum)(enums_1.Sources, { each: true }),
    __metadata("design:type", String)
], RenewalLicenseRequestDto.prototype, "source", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], RenewalLicenseRequestDto.prototype, "isExternal", void 0);
__decorate([
    (0, swagger_1.ApiHideProperty)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], RenewalLicenseRequestDto.prototype, "requestType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: true }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], RenewalLicenseRequestDto.prototype, "successRedirectUrl", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: true }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], RenewalLicenseRequestDto.prototype, "failureRedirectUrl", void 0);
class MobileRenewalLicenseRequestDto {
}
exports.MobileRenewalLicenseRequestDto = MobileRenewalLicenseRequestDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        required: true,
    }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], MobileRenewalLicenseRequestDto.prototype, "weight", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: true,
    }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], MobileRenewalLicenseRequestDto.prototype, "height", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: true,
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], MobileRenewalLicenseRequestDto.prototype, "eyes", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], MobileRenewalLicenseRequestDto.prototype, "reference", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsIn)(constants_1.licenseClasses.map((l) => l.id), { message: messages_1.MESSAGES.invalidValue('license class') }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], MobileRenewalLicenseRequestDto.prototype, "licenseClassId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], MobileRenewalLicenseRequestDto.prototype, "years", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], MobileRenewalLicenseRequestDto.prototype, "oldLicenseNo", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], MobileRenewalLicenseRequestDto.prototype, "applicationNo", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsEmail)({}, { message: 'Email is not valid' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], MobileRenewalLicenseRequestDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, required_dep_1.IsNGPhoneNumber)(),
    __metadata("design:type", String)
], MobileRenewalLicenseRequestDto.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsIn)(constants_1.nationalities.map((n) => n.id), { message: messages_1.MESSAGES.invalidValue('nationality') }),
    __metadata("design:type", Number)
], MobileRenewalLicenseRequestDto.prototype, "nationalityId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsIn)(constants_1.states.map((s) => s.id), { message: messages_1.MESSAGES.invalidValue('state of origin') }),
    __metadata("design:type", Number)
], MobileRenewalLicenseRequestDto.prototype, "stateId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsIn)(constants_1.lgas.map((l) => l.id), { message: messages_1.MESSAGES.invalidValue('lga of origin') }),
    __metadata("design:type", Number)
], MobileRenewalLicenseRequestDto.prototype, "lgaId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsEnum)(enums_1.Sources, { each: true }),
    __metadata("design:type", String)
], MobileRenewalLicenseRequestDto.prototype, "source", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], MobileRenewalLicenseRequestDto.prototype, "isExternal", void 0);
__decorate([
    (0, swagger_1.ApiHideProperty)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], MobileRenewalLicenseRequestDto.prototype, "requestType", void 0);
__decorate([
    (0, swagger_1.ApiHideProperty)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], MobileRenewalLicenseRequestDto.prototype, "status", void 0);
class ReplaceLicenseRequestDto {
}
exports.ReplaceLicenseRequestDto = ReplaceLicenseRequestDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        required: true,
    }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], ReplaceLicenseRequestDto.prototype, "weight", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: true,
    }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], ReplaceLicenseRequestDto.prototype, "height", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: true,
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ReplaceLicenseRequestDto.prototype, "eyes", void 0);
__decorate([
    (0, swagger_1.ApiHideProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ReplaceLicenseRequestDto.prototype, "reference", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsIn)(constants_1.licenseClasses.map((l) => l.id), { message: messages_1.MESSAGES.invalidValue('license class') }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], ReplaceLicenseRequestDto.prototype, "licenseClassId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], ReplaceLicenseRequestDto.prototype, "years", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], ReplaceLicenseRequestDto.prototype, "oldLicenseNo", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsEmail)({}, { message: 'Email is not valid' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ReplaceLicenseRequestDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, required_dep_1.IsNGPhoneNumber)(),
    __metadata("design:type", String)
], ReplaceLicenseRequestDto.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsIn)(constants_1.nationalities.map((n) => n.id), { message: messages_1.MESSAGES.invalidValue('nationality') }),
    __metadata("design:type", Number)
], ReplaceLicenseRequestDto.prototype, "nationalityId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsIn)(constants_1.states.map((s) => s.id), { message: messages_1.MESSAGES.invalidValue('state of origin') }),
    __metadata("design:type", Number)
], ReplaceLicenseRequestDto.prototype, "stateId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsIn)(constants_1.lgas.map((l) => l.id), { message: messages_1.MESSAGES.invalidValue('lga of origin') }),
    __metadata("design:type", Number)
], ReplaceLicenseRequestDto.prototype, "lgaId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsEnum)(enums_1.Sources, { each: true }),
    __metadata("design:type", String)
], ReplaceLicenseRequestDto.prototype, "source", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], ReplaceLicenseRequestDto.prototype, "isExternal", void 0);
__decorate([
    (0, swagger_1.ApiHideProperty)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ReplaceLicenseRequestDto.prototype, "requestType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: true }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], ReplaceLicenseRequestDto.prototype, "successRedirectUrl", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: true }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], ReplaceLicenseRequestDto.prototype, "failureRedirectUrl", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsEnum)(enums_1.ReplacementReason, { each: true }),
    __metadata("design:type", String)
], ReplaceLicenseRequestDto.prototype, "replacementReason", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ReplaceLicenseRequestDto.prototype, "affidavitNo", void 0);
class MobileReplaceLicenseRequestDto extends MobileRenewalLicenseRequestDto {
}
exports.MobileReplaceLicenseRequestDto = MobileReplaceLicenseRequestDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsEnum)(enums_1.ReplacementReason, { each: true }),
    __metadata("design:type", String)
], MobileReplaceLicenseRequestDto.prototype, "replacementReason", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], MobileReplaceLicenseRequestDto.prototype, "affidavitNo", void 0);
__decorate([
    (0, swagger_1.ApiHideProperty)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], MobileReplaceLicenseRequestDto.prototype, "status", void 0);
//# sourceMappingURL=license.dto.js.map