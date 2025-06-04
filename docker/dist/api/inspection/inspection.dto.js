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
exports.InspectionQuestionResDto = exports.InspectionQuestionReqDto = exports.ListInspectionsQuestionsDto = exports.ListInspectionsDto = exports.NewInspectionDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const enums_1 = require("../../core/constants/enums");
const all_dto_1 = require("../../core/interfaces/all.dto");
const classes_1 = require("../../core/constants/classes");
const class_transformer_1 = require("class-transformer");
class NewInspectionDto {
}
exports.NewInspectionDto = NewInspectionDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], NewInspectionDto.prototype, "drivingSchoolId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], NewInspectionDto.prototype, "questionId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsEnum)(enums_1.InspectionStatus),
    __metadata("design:type", String)
], NewInspectionDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], NewInspectionDto.prototype, "totalScore", void 0);
__decorate([
    (0, swagger_1.ApiHideProperty)(),
    __metadata("design:type", Number)
], NewInspectionDto.prototype, "stateId", void 0);
__decorate([
    (0, swagger_1.ApiHideProperty)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], NewInspectionDto.prototype, "queryReasons", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: [classes_1.InspectionResponse] }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => classes_1.InspectionResponse),
    __metadata("design:type", Array)
], NewInspectionDto.prototype, "inspectionResult", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], NewInspectionDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], NewInspectionDto.prototype, "month", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], NewInspectionDto.prototype, "year", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], NewInspectionDto.prototype, "comment", void 0);
class ListInspectionsDto extends all_dto_1.BaseRequestDto {
}
exports.ListInspectionsDto = ListInspectionsDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Registration status filter', enum: enums_1.InspectionStatus }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ListInspectionsDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], ListInspectionsDto.prototype, "createdAtStart", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], ListInspectionsDto.prototype, "createdAtEnd", void 0);
class ListInspectionsQuestionsDto extends all_dto_1.BaseRequestDto {
}
exports.ListInspectionsQuestionsDto = ListInspectionsQuestionsDto;
class InspectionQuestionReqDto {
}
exports.InspectionQuestionReqDto = InspectionQuestionReqDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        type: [classes_1.InspectionQuestionsRequestDto],
    }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => classes_1.InspectionQuestionsRequestDto),
    __metadata("design:type", Array)
], InspectionQuestionReqDto.prototype, "questions", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], InspectionQuestionReqDto.prototype, "stateId", void 0);
class InspectionQuestionResDto {
}
exports.InspectionQuestionResDto = InspectionQuestionResDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        type: [classes_1.InspectionQuestionsResponseDto],
    }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => classes_1.InspectionQuestionsResponseDto),
    __metadata("design:type", Array)
], InspectionQuestionResDto.prototype, "questions", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], InspectionQuestionResDto.prototype, "stateId", void 0);
//# sourceMappingURL=inspection.dto.js.map