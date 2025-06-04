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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Question = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./user.entity");
const base_entity_1 = require("./base.entity");
const enums_1 = require("../core/constants/enums");
const aws_s3_1 = __importDefault(require("../core/helpers/aws.s3"));
let Question = class Question extends base_entity_1.BaseEntity {
    async afterFind() {
        if (this.questionImage) {
            try {
                const awsS3bucket = new aws_s3_1.default();
                this.presignedUrl = await awsS3bucket.getPreSignedUrl(this.questionImage);
            }
            catch (error) {
                console.error('Error generating pre-signed URL:', error);
                this.presignedUrl = null;
            }
        }
    }
};
exports.Question = Question;
__decorate([
    (0, typeorm_1.Column)({ name: 'question_text' }),
    __metadata("design:type", String)
], Question.prototype, "questionText", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 100, name: 'question_image', nullable: true }),
    __metadata("design:type", String)
], Question.prototype, "questionImage", void 0);
__decorate([
    (0, typeorm_1.Column)('json'),
    __metadata("design:type", Array)
], Question.prototype, "options", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'correct_answer' }),
    __metadata("design:type", String)
], Question.prototype, "correctAnswer", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Question.prototype, "explanation", void 0);
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.Column)({ default: enums_1.DifficultyLevel.Easy, name: 'difficulty_level' }),
    __metadata("design:type", Number)
], Question.prototype, "difficultyLevel", void 0);
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.Column)({ type: 'int', default: enums_1.QuestionCategory.DrivingSchoolTest, nullable: true }),
    __metadata("design:type", Number)
], Question.prototype, "category", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', name: 'time_limit', default: 10 }),
    __metadata("design:type", Number)
], Question.prototype, "timeLimit", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'question_type', nullable: true }),
    __metadata("design:type", String)
], Question.prototype, "questionType", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'created_by' }),
    __metadata("design:type", user_entity_1.User)
], Question.prototype, "createdBy", void 0);
__decorate([
    (0, typeorm_1.AfterLoad)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], Question.prototype, "afterFind", null);
exports.Question = Question = __decorate([
    (0, typeorm_1.Entity)({ name: 'questions' })
], Question);
//# sourceMappingURL=question.entity.js.map