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
exports.CreateInstructorDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const constants_1 = require("../../core/constants/constants");
const enums_1 = require("../../core/constants/enums");
const messages_1 = require("../../core/constants/messages");
const required_dep_1 = require("../../core/validators/required.dep");
class CreateInstructorDto {
}
exports.CreateInstructorDto = CreateInstructorDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Name of the instructor' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateInstructorDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Avatar URL of the instructor', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateInstructorDto.prototype, "avatar", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Phone number of the instructor' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateInstructorDto.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Email address of the instructor' }),
    (0, class_validator_1.IsEmail)({}, { message: 'Email is not valid' }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateInstructorDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Date of birth of the instructor' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, required_dep_1.IsValidDateFormat)(),
    __metadata("design:type", String)
], CreateInstructorDto.prototype, "dateOfBirth", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Gender ID of the instructor',
        enum: constants_1.genders.map((g) => g.id),
    }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsIn)(constants_1.genders.map((g) => g.id), { message: messages_1.MESSAGES.invalidValue('gender') }),
    __metadata("design:type", Number)
], CreateInstructorDto.prototype, "genderId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'LGA ID of the instructor',
        example: 518,
    }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsIn)(constants_1.lgas.map((l) => l.id), { message: messages_1.MESSAGES.invalidValue('lga') }),
    __metadata("design:type", Number)
], CreateInstructorDto.prototype, "lgaId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'State ID of the instructor',
        example: 25,
    }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsIn)(constants_1.states.map((s) => s.id), { message: messages_1.MESSAGES.invalidValue('state') }),
    __metadata("design:type", Number)
], CreateInstructorDto.prototype, "stateId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Address of the instructor' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateInstructorDto.prototype, "address", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Status of the instructor',
        enum: enums_1.Status,
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsIn)(Object.values(enums_1.Status), { message: messages_1.MESSAGES.invalidValue('status') }),
    __metadata("design:type", Number)
], CreateInstructorDto.prototype, "isActive", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateInstructorDto.prototype, "instructorId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateInstructorDto.prototype, "drivingSchoolId", void 0);
//# sourceMappingURL=Instructor.dto.js.map