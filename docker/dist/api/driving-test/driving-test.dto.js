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
exports.SubmitDrivingTestDto = exports.DrivingTestScheduleDto = exports.UpdateDrivingTestCenterDto = exports.CreateDrivingTestCenterDto = exports.BookDrivingTestSlotDto = exports.DrivingTestCenterIdDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const required_dep_1 = require("../../core/validators/required.dep");
const enums_1 = require("../../core/constants/enums");
const messages_1 = require("../../core/constants/messages");
const constants_1 = require("../../core/constants/constants");
class DrivingTestCenterIdDto {
}
exports.DrivingTestCenterIdDto = DrivingTestCenterIdDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        required: true,
    }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], DrivingTestCenterIdDto.prototype, "drivingTestCenterId", void 0);
class BookDrivingTestSlotDto extends DrivingTestCenterIdDto {
}
exports.BookDrivingTestSlotDto = BookDrivingTestSlotDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], BookDrivingTestSlotDto.prototype, "studentId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsIn)(constants_1.states.map((s) => s.id), { message: messages_1.MESSAGES.invalidValue('state') }),
    __metadata("design:type", Number)
], BookDrivingTestSlotDto.prototype, "stateId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsIn)(constants_1.lgas.map((l) => l.id), { message: messages_1.MESSAGES.invalidValue('lga') }),
    __metadata("design:type", Number)
], BookDrivingTestSlotDto.prototype, "lgaId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], BookDrivingTestSlotDto.prototype, "date", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, required_dep_1.IsTime)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], BookDrivingTestSlotDto.prototype, "time", void 0);
class CreateDrivingTestCenterDto {
}
exports.CreateDrivingTestCenterDto = CreateDrivingTestCenterDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        required: true,
    }),
    (0, class_validator_1.IsIn)(constants_1.states.map((s) => s.id), { message: messages_1.MESSAGES.invalidValue('state') }),
    __metadata("design:type", Number)
], CreateDrivingTestCenterDto.prototype, "stateId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: true,
    }),
    (0, class_validator_1.IsIn)(constants_1.lgas.map((l) => l.id), { message: messages_1.MESSAGES.invalidValue('lga') }),
    __metadata("design:type", Number)
], CreateDrivingTestCenterDto.prototype, "lgaId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsEmail)({}, { message: 'Email is not valid' }),
    __metadata("design:type", String)
], CreateDrivingTestCenterDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, required_dep_1.IsNGPhoneNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateDrivingTestCenterDto.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateDrivingTestCenterDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateDrivingTestCenterDto.prototype, "devices", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateDrivingTestCenterDto.prototype, "threshold", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
    }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsEnum)(enums_1.Status, { message: messages_1.MESSAGES.invalidValue('status') }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateDrivingTestCenterDto.prototype, "isActive", void 0);
__decorate([
    (0, swagger_1.ApiHideProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateDrivingTestCenterDto.prototype, "identifier", void 0);
class UpdateDrivingTestCenterDto {
}
exports.UpdateDrivingTestCenterDto = UpdateDrivingTestCenterDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], UpdateDrivingTestCenterDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsIn)(constants_1.states.map((s) => s.id), { message: messages_1.MESSAGES.invalidValue('state') }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], UpdateDrivingTestCenterDto.prototype, "stateId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsIn)(constants_1.lgas.map((l) => l.id), { message: messages_1.MESSAGES.invalidValue('lga') }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], UpdateDrivingTestCenterDto.prototype, "lgaId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsEmail)({}, { message: 'Email is not valid' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateDrivingTestCenterDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, required_dep_1.IsNGPhoneNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateDrivingTestCenterDto.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateDrivingTestCenterDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], UpdateDrivingTestCenterDto.prototype, "devices", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], UpdateDrivingTestCenterDto.prototype, "threshold", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
    }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsEnum)(enums_1.Status, { message: messages_1.MESSAGES.invalidValue('status') }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], UpdateDrivingTestCenterDto.prototype, "isActive", void 0);
class DrivingTestScheduleDto {
}
exports.DrivingTestScheduleDto = DrivingTestScheduleDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        required: true,
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsIn)(constants_1.states.map((s) => s.id), { message: messages_1.MESSAGES.invalidValue('state') }),
    __metadata("design:type", Number)
], DrivingTestScheduleDto.prototype, "stateId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: true,
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsIn)(constants_1.lgas.map((l) => l.id), { message: messages_1.MESSAGES.invalidValue('lga') }),
    __metadata("design:type", Number)
], DrivingTestScheduleDto.prototype, "lgaId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: true,
    }),
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], DrivingTestScheduleDto.prototype, "date", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: true,
    }),
    (0, required_dep_1.IsTime)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], DrivingTestScheduleDto.prototype, "time", void 0);
__decorate([
    (0, swagger_1.ApiHideProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsIn)(Object.values(enums_1.BookingStatus)),
    __metadata("design:type", Number)
], DrivingTestScheduleDto.prototype, "bookingStatus", void 0);
__decorate([
    (0, swagger_1.ApiHideProperty)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], DrivingTestScheduleDto.prototype, "transactionId", void 0);
__decorate([
    (0, swagger_1.ApiHideProperty)(),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], DrivingTestScheduleDto.prototype, "canCreate", void 0);
class SubmitDrivingTestDto {
}
exports.SubmitDrivingTestDto = SubmitDrivingTestDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        required: true,
    }),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], SubmitDrivingTestDto.prototype, "answers", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], SubmitDrivingTestDto.prototype, "applicationNo", void 0);
__decorate([
    (0, swagger_1.ApiHideProperty)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], SubmitDrivingTestDto.prototype, "assessedBy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], SubmitDrivingTestDto.prototype, "files", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], SubmitDrivingTestDto.prototype, "vehicleType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], SubmitDrivingTestDto.prototype, "location", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], SubmitDrivingTestDto.prototype, "reference", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], SubmitDrivingTestDto.prototype, "transactionId", void 0);
//# sourceMappingURL=driving-test.dto.js.map