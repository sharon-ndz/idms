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
exports.FetchDashboardStatsRequestDto = exports.DrivingSchoolQueryApplicationDto = exports.toggleSchoolStatusDto = exports.CompleteSchoolApplicationDto = exports.listDrivingSchoolInspectionsDto = exports.ListApplicationsDto = exports.InspectionListRequestsDto = exports.DrivingSchoolApplicationStatsDto = exports.AssignOfficerDto = exports.DirivinSchoolListRequestsDto = exports.DrivingSchoolStatsDto = exports.SelectedApplicantFileDto = exports.ApplicationStatsDto = exports.ActionDrivingSchoolApplicationDto = exports.UpdateDrivingSchoolApplicationDto = exports.SubmitDrivingSchoolApplicationDto = exports.DrivingSchoolCommonDto = exports.FetchStudentListDto = exports.FetchMasterListDto = exports.UpdateDrivingSchoolDto = exports.SelfServiceCreateSchoolDto = exports.DrivingSchoolDto = void 0;
const class_validator_1 = require("class-validator");
const all_dto_1 = require("../../core/interfaces/all.dto");
const swagger_1 = require("@nestjs/swagger");
const messages_1 = require("../../core/constants/messages");
const enums_1 = require("../../core/constants/enums");
const required_dep_1 = require("../../core/validators/required.dep");
const class_transformer_1 = require("class-transformer");
const constants_1 = require("../../core/constants/constants");
const page_options_dto_1 = require("../../core/interfaces/page-options.dto");
class DrivingSchoolDto {
}
exports.DrivingSchoolDto = DrivingSchoolDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], DrivingSchoolDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsEmail)({}, { message: 'Email is not valid' }),
    __metadata("design:type", String)
], DrivingSchoolDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], DrivingSchoolDto.prototype, "logo", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, required_dep_1.IsNGPhoneNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], DrivingSchoolDto.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], DrivingSchoolDto.prototype, "stateId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], DrivingSchoolDto.prototype, "lgaId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], DrivingSchoolDto.prototype, "address", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(enums_1.Status, { each: true }),
    __metadata("design:type", Number)
], DrivingSchoolDto.prototype, "isActive", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)({ each: true }),
    (0, class_validator_1.Min)(3, { each: true }),
    __metadata("design:type", Array)
], DrivingSchoolDto.prototype, "trainingDurations", void 0);
class SelfServiceCreateSchoolDto {
}
exports.SelfServiceCreateSchoolDto = SelfServiceCreateSchoolDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], SelfServiceCreateSchoolDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsEmail)({}, { message: 'Email is not valid' }),
    __metadata("design:type", String)
], SelfServiceCreateSchoolDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], SelfServiceCreateSchoolDto.prototype, "logo", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, required_dep_1.IsNGPhoneNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], SelfServiceCreateSchoolDto.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], SelfServiceCreateSchoolDto.prototype, "stateId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], SelfServiceCreateSchoolDto.prototype, "lgaId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], SelfServiceCreateSchoolDto.prototype, "address", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], SelfServiceCreateSchoolDto.prototype, "rcNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.Matches)(new RegExp(constants_1.PASSWORD_REGEX), {
        message: messages_1.MESSAGES.passwordStrengthFailed,
    }),
    __metadata("design:type", String)
], SelfServiceCreateSchoolDto.prototype, "password", void 0);
class UpdateDrivingSchoolDto {
}
exports.UpdateDrivingSchoolDto = UpdateDrivingSchoolDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateDrivingSchoolDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsEmail)({}, { message: 'Email is not valid' }),
    __metadata("design:type", String)
], UpdateDrivingSchoolDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateDrivingSchoolDto.prototype, "logo", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, required_dep_1.IsNGPhoneNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], UpdateDrivingSchoolDto.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], UpdateDrivingSchoolDto.prototype, "stateId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], UpdateDrivingSchoolDto.prototype, "lgaId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateDrivingSchoolDto.prototype, "address", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(enums_1.Status, { each: true }),
    __metadata("design:type", Number)
], UpdateDrivingSchoolDto.prototype, "isActive", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], UpdateDrivingSchoolDto.prototype, "id", void 0);
class FetchMasterListDto extends all_dto_1.GetParam {
}
exports.FetchMasterListDto = FetchMasterListDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        example: 25,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsIn)(constants_1.states.map((s) => s.id.toString()), { message: messages_1.MESSAGES.invalidValue('state') }),
    __metadata("design:type", Number)
], FetchMasterListDto.prototype, "stateId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        example: 518,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsIn)(constants_1.lgas.map((l) => l.id.toString()), { message: messages_1.MESSAGES.invalidValue('lga') }),
    __metadata("design:type", String)
], FetchMasterListDto.prototype, "lgaId", void 0);
class FetchStudentListDto extends all_dto_1.BaseRequestDto {
}
exports.FetchStudentListDto = FetchStudentListDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsIn)(['0', '1']),
    __metadata("design:type", String)
], FetchStudentListDto.prototype, "graduated", void 0);
class DrivingSchoolCommonDto {
}
exports.DrivingSchoolCommonDto = DrivingSchoolCommonDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsIn)(constants_1.salutations.map((s) => s.id), { message: messages_1.MESSAGES.invalidValue('title') }),
    __metadata("design:type", Number)
], DrivingSchoolCommonDto.prototype, "titleId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], DrivingSchoolCommonDto.prototype, "firstName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], DrivingSchoolCommonDto.prototype, "middleName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], DrivingSchoolCommonDto.prototype, "lastName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], DrivingSchoolCommonDto.prototype, "maidenName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsEmail)({}, { message: 'Email is not valid' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], DrivingSchoolCommonDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, required_dep_1.IsNGPhoneNumber)(),
    __metadata("design:type", String)
], DrivingSchoolCommonDto.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        enum: [1, 2],
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsIn)(constants_1.genders.map((g) => g.id), { message: messages_1.MESSAGES.invalidValue('gender') }),
    __metadata("design:type", String)
], DrivingSchoolCommonDto.prototype, "genderId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, required_dep_1.IsValidDateFormat)(),
    __metadata("design:type", String)
], DrivingSchoolCommonDto.prototype, "dateOfBirth", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], DrivingSchoolCommonDto.prototype, "placeOfBirth", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsIn)(constants_1.nationalities.map((n) => n.id), { message: messages_1.MESSAGES.invalidValue('nationality') }),
    __metadata("design:type", Number)
], DrivingSchoolCommonDto.prototype, "nationalityId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsIn)(constants_1.states.map((s) => s.id), { message: messages_1.MESSAGES.invalidValue('state of origin') }),
    __metadata("design:type", Number)
], DrivingSchoolCommonDto.prototype, "stateOfOriginId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsIn)(constants_1.lgas.map((l) => l.id), { message: messages_1.MESSAGES.invalidValue('lga of origin') }),
    __metadata("design:type", Number)
], DrivingSchoolCommonDto.prototype, "lgaOfOriginId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], DrivingSchoolCommonDto.prototype, "address", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], DrivingSchoolCommonDto.prototype, "files", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsIn)(constants_1.maritalStatuses.map((s) => s.id), {
        message: messages_1.MESSAGES.invalidValue('marital status'),
    }),
    __metadata("design:type", Number)
], DrivingSchoolCommonDto.prototype, "maritalStatusId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsIn)(constants_1.bloodGroups.map((b) => b.id), {
        message: messages_1.MESSAGES.invalidValue('blood group'),
    }),
    __metadata("design:type", Number)
], DrivingSchoolCommonDto.prototype, "bloodGroupId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsIn)(constants_1.occupations.map((o) => o.id), { message: messages_1.MESSAGES.invalidValue('occupation') }),
    __metadata("design:type", String)
], DrivingSchoolCommonDto.prototype, "occupationId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], DrivingSchoolCommonDto.prototype, "trainingDurationId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], DrivingSchoolCommonDto.prototype, "nextOfKinName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], DrivingSchoolCommonDto.prototype, "nextOfKinPhone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsIn)(constants_1.relationships.map((r) => r.id), {
        message: messages_1.MESSAGES.invalidValue('next of kin relationship'),
    }),
    __metadata("design:type", Number)
], DrivingSchoolCommonDto.prototype, "nextOfKinRelationshipId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsIn)(constants_1.nationalities.map((n) => n.id), { message: messages_1.MESSAGES.invalidValue('nationality') }),
    __metadata("design:type", Number)
], DrivingSchoolCommonDto.prototype, "nextOfKinNationalityId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.Length)(11, 11),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], DrivingSchoolCommonDto.prototype, "nin", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(enums_1.CourseLevel),
    __metadata("design:type", String)
], DrivingSchoolCommonDto.prototype, "courseLevel", void 0);
class SubmitDrivingSchoolApplicationDto extends DrivingSchoolCommonDto {
}
exports.SubmitDrivingSchoolApplicationDto = SubmitDrivingSchoolApplicationDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'number',
    }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], SubmitDrivingSchoolApplicationDto.prototype, "drivingSchoolId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], SubmitDrivingSchoolApplicationDto.prototype, "reference", void 0);
class UpdateDrivingSchoolApplicationDto extends DrivingSchoolCommonDto {
}
exports.UpdateDrivingSchoolApplicationDto = UpdateDrivingSchoolApplicationDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'number',
    }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], UpdateDrivingSchoolApplicationDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], UpdateDrivingSchoolApplicationDto.prototype, "files", void 0);
class ActionDrivingSchoolApplicationDto {
}
exports.ActionDrivingSchoolApplicationDto = ActionDrivingSchoolApplicationDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], ActionDrivingSchoolApplicationDto.prototype, "applicationId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'number',
        enum: [1],
    }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsIn)([enums_1.Reg.Approved], { each: true }),
    __metadata("design:type", Number)
], ActionDrivingSchoolApplicationDto.prototype, "status", void 0);
class ApplicationStatsDto {
}
exports.ApplicationStatsDto = ApplicationStatsDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, required_dep_1.IsInReg)(),
    __metadata("design:type", String)
], ApplicationStatsDto.prototype, "status", void 0);
class SelectedApplicantFileDto {
}
exports.SelectedApplicantFileDto = SelectedApplicantFileDto;
class DrivingSchoolStatsDto {
}
exports.DrivingSchoolStatsDto = DrivingSchoolStatsDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 127, description: 'Total number of driving schools' }),
    __metadata("design:type", Number)
], DrivingSchoolStatsDto.prototype, "totalSchools", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 117, description: 'Number of active driving schools' }),
    __metadata("design:type", Number)
], DrivingSchoolStatsDto.prototype, "activeSchools", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 6, description: 'Number of driving schools on probation' }),
    __metadata("design:type", Number)
], DrivingSchoolStatsDto.prototype, "probationSchools", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 4, description: 'Number of suspended driving schools' }),
    __metadata("design:type", Number)
], DrivingSchoolStatsDto.prototype, "suspendedSchools", void 0);
class DirivinSchoolListRequestsDto extends page_options_dto_1.PageOptionsDto {
}
exports.DirivinSchoolListRequestsDto = DirivinSchoolListRequestsDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Search by school name' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], DirivinSchoolListRequestsDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Search by school identifier' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], DirivinSchoolListRequestsDto.prototype, "identifier", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Search by school email' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], DirivinSchoolListRequestsDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Search by school phone number' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], DirivinSchoolListRequestsDto.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Filter by status (Active, Inactive, Probation, Suspended)',
        enum: enums_1.Status,
    }),
    (0, class_validator_1.IsEnum)(enums_1.Status),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], DirivinSchoolListRequestsDto.prototype, "status", void 0);
class AssignOfficerDto {
}
exports.AssignOfficerDto = AssignOfficerDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], AssignOfficerDto.prototype, "officerId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsDate)(),
    (0, class_transformer_1.Type)(() => Date),
    __metadata("design:type", Date)
], AssignOfficerDto.prototype, "inspectionDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], AssignOfficerDto.prototype, "drivingSchoolId", void 0);
class DrivingSchoolApplicationStatsDto {
}
exports.DrivingSchoolApplicationStatsDto = DrivingSchoolApplicationStatsDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 127, description: 'Total number of driving school applications' }),
    __metadata("design:type", Number)
], DrivingSchoolApplicationStatsDto.prototype, "totalApplications", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 117, description: 'Total number of inspections' }),
    __metadata("design:type", Number)
], DrivingSchoolApplicationStatsDto.prototype, "totalInspections", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 4, description: 'Number of pending applications' }),
    __metadata("design:type", Number)
], DrivingSchoolApplicationStatsDto.prototype, "pendingApplications", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 4, description: 'Number of acknowledged applications' }),
    __metadata("design:type", Number)
], DrivingSchoolApplicationStatsDto.prototype, "acknowledgedApplicaitons", void 0);
class InspectionListRequestsDto extends page_options_dto_1.PageOptionsDto {
}
exports.InspectionListRequestsDto = InspectionListRequestsDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Search by school name' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], InspectionListRequestsDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Search by application ID' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], InspectionListRequestsDto.prototype, "applicationId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Search by school email' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], InspectionListRequestsDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Search by school phone number' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], InspectionListRequestsDto.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Filter by status (Active, Inactive, Probation, Suspended)',
        enum: enums_1.Status,
    }),
    (0, class_validator_1.IsEnum)(enums_1.Status),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], InspectionListRequestsDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], InspectionListRequestsDto.prototype, "createdAtStart", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], InspectionListRequestsDto.prototype, "createdAtEnd", void 0);
class ListApplicationsDto extends all_dto_1.BaseRequestDto {
}
exports.ListApplicationsDto = ListApplicationsDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Registration status filter', enum: enums_1.Reg }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", Number)
], ListApplicationsDto.prototype, "regStatus", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Status filter', enum: [enums_1.Status.Active | enums_1.Status.Inactive] }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", Number)
], ListApplicationsDto.prototype, "isActive", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], ListApplicationsDto.prototype, "stateId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], ListApplicationsDto.prototype, "lgaId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], ListApplicationsDto.prototype, "createdAtStart", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], ListApplicationsDto.prototype, "createdAtEnd", void 0);
class listDrivingSchoolInspectionsDto extends all_dto_1.BaseRequestDto {
}
exports.listDrivingSchoolInspectionsDto = listDrivingSchoolInspectionsDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Filter by status', enum: enums_1.InspectionStatus }),
    (0, class_validator_1.IsEnum)(enums_1.InspectionStatus),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], listDrivingSchoolInspectionsDto.prototype, "status", void 0);
class CompleteSchoolApplicationDto {
}
exports.CompleteSchoolApplicationDto = CompleteSchoolApplicationDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 10, description: 'Total number of vehicles available' }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], CompleteSchoolApplicationDto.prototype, "totalVehicles", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: ['Mini Pick-ups', 'Motorcycle', 'SUVs'],
        description: 'Types of vehicles available',
    }),
    (0, class_validator_1.IsString)({ each: true }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Array)
], CompleteSchoolApplicationDto.prototype, "vehicleTypes", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'None', description: 'Special gadgets in vehicles, if any' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CompleteSchoolApplicationDto.prototype, "specialGadgets", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 5, description: 'Total number of driving simulators' }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], CompleteSchoolApplicationDto.prototype, "totalSimulators", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Instructor guide', description: 'Teaching aids available' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CompleteSchoolApplicationDto.prototype, "teachingAids", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '50 kilometers', description: 'Training range location' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CompleteSchoolApplicationDto.prototype, "trainingRange", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 10, description: 'Total number of classrooms' }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], CompleteSchoolApplicationDto.prototype, "totalClassrooms", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '10 Person', description: 'Classroom capacity' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CompleteSchoolApplicationDto.prototype, "classRoomCapacity", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 2, description: 'Total number of instructors' }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], CompleteSchoolApplicationDto.prototype, "totalInstructors", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: ['IN-676633', 'IN-092993', 'IN-234165'], description: 'Instructor IDs' }),
    (0, class_validator_1.IsString)({ each: true }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Array)
], CompleteSchoolApplicationDto.prototype, "instructorIDs", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CompleteSchoolApplicationDto.prototype, "docType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CompleteSchoolApplicationDto.prototype, "docFile", void 0);
class toggleSchoolStatusDto {
}
exports.toggleSchoolStatusDto = toggleSchoolStatusDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'status (Active, Inactive, Probation, Suspended)', enum: enums_1.Status }),
    (0, class_validator_1.IsEnum)(enums_1.Status),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], toggleSchoolStatusDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateIf)((o) => o.status === enums_1.Status.Suspended),
    __metadata("design:type", String)
], toggleSchoolStatusDto.prototype, "reason", void 0);
class DrivingSchoolQueryApplicationDto {
}
exports.DrivingSchoolQueryApplicationDto = DrivingSchoolQueryApplicationDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], DrivingSchoolQueryApplicationDto.prototype, "reason", void 0);
class FetchDashboardStatsRequestDto {
}
exports.FetchDashboardStatsRequestDto = FetchDashboardStatsRequestDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Query statistics status by (Driving Schools, Students, LASDRI Officers, Revenue)',
        enum: enums_1.StatisticsFilter,
    }),
    (0, class_validator_1.IsEnum)(enums_1.StatisticsFilter),
    __metadata("design:type", String)
], FetchDashboardStatsRequestDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Filter revenue monthly breakdown statistics by the selected year',
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], FetchDashboardStatsRequestDto.prototype, "selectedYear", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Top LGA revenue count to display' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], FetchDashboardStatsRequestDto.prototype, "topLgaCount", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Bottom LGA revenue count to display' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], FetchDashboardStatsRequestDto.prototype, "bottomLgaCount", void 0);
//# sourceMappingURL=driving-school.dto.js.map