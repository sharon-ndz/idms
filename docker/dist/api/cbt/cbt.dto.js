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
exports.SubmitTestDto = exports.QuestionByStudentDto = exports.FetchQuestionsDto = exports.UpdateQuestionDto = exports.CreateQuestionDto = exports.CbtRescheduleDto = exports.CbtScheduleDto = exports.UpdateCbtCenterDto = exports.CreateCbtCenterDto = exports.BookSlotDto = exports.CbtCenterIdDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const required_dep_1 = require("../../core/validators/required.dep");
const enums_1 = require("../../core/constants/enums");
const all_dto_1 = require("../../core/interfaces/all.dto");
const messages_1 = require("../../core/constants/messages");
const constants_1 = require("../../core/constants/constants");
class CbtCenterIdDto {
}
exports.CbtCenterIdDto = CbtCenterIdDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        required: true,
    }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CbtCenterIdDto.prototype, "cbtCenterId", void 0);
class BookSlotDto {
}
exports.BookSlotDto = BookSlotDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], BookSlotDto.prototype, "cbtCenterId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], BookSlotDto.prototype, "studentId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsIn)(constants_1.states.map((s) => s.id), { message: messages_1.MESSAGES.invalidValue('state') }),
    __metadata("design:type", Number)
], BookSlotDto.prototype, "stateId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsIn)(constants_1.lgas.map((l) => l.id), { message: messages_1.MESSAGES.invalidValue('lga') }),
    __metadata("design:type", Number)
], BookSlotDto.prototype, "lgaId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], BookSlotDto.prototype, "date", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, required_dep_1.IsTime)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], BookSlotDto.prototype, "time", void 0);
class CreateCbtCenterDto {
}
exports.CreateCbtCenterDto = CreateCbtCenterDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        required: true,
    }),
    (0, class_validator_1.IsIn)(constants_1.states.map((s) => s.id), { message: messages_1.MESSAGES.invalidValue('state') }),
    __metadata("design:type", Number)
], CreateCbtCenterDto.prototype, "stateId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: true,
    }),
    (0, class_validator_1.IsIn)(constants_1.lgas.map((l) => l.id), { message: messages_1.MESSAGES.invalidValue('lga') }),
    __metadata("design:type", Number)
], CreateCbtCenterDto.prototype, "lgaId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateCbtCenterDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiHideProperty)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateCbtCenterDto.prototype, "isActive", void 0);
class UpdateCbtCenterDto extends CreateCbtCenterDto {
}
exports.UpdateCbtCenterDto = UpdateCbtCenterDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        required: true,
    }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], UpdateCbtCenterDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
    }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsEnum)(enums_1.Status, { message: messages_1.MESSAGES.invalidValue('status') }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], UpdateCbtCenterDto.prototype, "isActive", void 0);
class CbtScheduleDto {
}
exports.CbtScheduleDto = CbtScheduleDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        required: true,
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsIn)(constants_1.states.map((s) => s.id), { message: messages_1.MESSAGES.invalidValue('state') }),
    __metadata("design:type", Number)
], CbtScheduleDto.prototype, "stateId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: true,
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsIn)(constants_1.lgas.map((l) => l.id), { message: messages_1.MESSAGES.invalidValue('lga') }),
    __metadata("design:type", Number)
], CbtScheduleDto.prototype, "lgaId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: true,
    }),
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CbtScheduleDto.prototype, "date", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: true,
    }),
    (0, required_dep_1.IsTime)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CbtScheduleDto.prototype, "time", void 0);
__decorate([
    (0, swagger_1.ApiHideProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CbtScheduleDto.prototype, "cbtStatus", void 0);
__decorate([
    (0, swagger_1.ApiHideProperty)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CbtScheduleDto.prototype, "transactionId", void 0);
class CbtRescheduleDto extends CbtScheduleDto {
}
exports.CbtRescheduleDto = CbtRescheduleDto;
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CbtRescheduleDto.prototype, "reference", void 0);
__decorate([
    (0, swagger_1.ApiHideProperty)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CbtRescheduleDto.prototype, "transactionId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CbtRescheduleDto.prototype, "studentId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CbtRescheduleDto.prototype, "cbtCenterId", void 0);
class CreateQuestionDto {
}
exports.CreateQuestionDto = CreateQuestionDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateQuestionDto.prototype, "questionText", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], CreateQuestionDto.prototype, "options", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateQuestionDto.prototype, "correctAnswer", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateQuestionDto.prototype, "explanation", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsEnum)(enums_1.DifficultyLevel),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateQuestionDto.prototype, "difficultyLevel", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsEnum)(enums_1.QuestionCategory),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateQuestionDto.prototype, "category", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateQuestionDto.prototype, "timeLimit", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateQuestionDto.prototype, "questionType", void 0);
class UpdateQuestionDto extends CreateQuestionDto {
}
exports.UpdateQuestionDto = UpdateQuestionDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        required: true,
    }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], UpdateQuestionDto.prototype, "id", void 0);
class FetchQuestionsDto extends all_dto_1.GetParam {
}
exports.FetchQuestionsDto = FetchQuestionsDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], FetchQuestionsDto.prototype, "category", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], FetchQuestionsDto.prototype, "difficultyLevel", void 0);
class QuestionByStudentDto {
}
exports.QuestionByStudentDto = QuestionByStudentDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        required: true,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], QuestionByStudentDto.prototype, "studentNo", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: true,
    }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], QuestionByStudentDto.prototype, "difficultyLevel", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: true,
    }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], QuestionByStudentDto.prototype, "category", void 0);
class SubmitTestDto extends QuestionByStudentDto {
}
exports.SubmitTestDto = SubmitTestDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        required: true,
    }),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", Object)
], SubmitTestDto.prototype, "answers", void 0);
//# sourceMappingURL=cbt.dto.js.map