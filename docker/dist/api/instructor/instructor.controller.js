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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InstructorController = void 0;
const common_1 = require("@nestjs/common");
const instructor_service_1 = require("./instructor.service");
const Instructor_dto_1 = require("./Instructor.dto");
const swagger_1 = require("@nestjs/swagger");
let InstructorController = class InstructorController {
    constructor(instructorService) {
        this.instructorService = instructorService;
    }
    create(data, req) {
        return this.instructorService.create(data);
    }
    validateInstructor(instructorId) {
        return this.instructorService.validateInstructor(instructorId);
    }
};
exports.InstructorController = InstructorController;
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Create instructor (Super Admin)',
    }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Post)('/'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Instructor_dto_1.CreateInstructorDto, Object]),
    __metadata("design:returntype", void 0)
], InstructorController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Validate instructor',
    }),
    (0, common_1.Get)('/validate/:instructorId'),
    __param(0, (0, common_1.Param)('instructorId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], InstructorController.prototype, "validateInstructor", null);
exports.InstructorController = InstructorController = __decorate([
    (0, swagger_1.ApiTags)('Instructor'),
    (0, common_1.Controller)('instructors'),
    __metadata("design:paramtypes", [instructor_service_1.InstructorService])
], InstructorController);
//# sourceMappingURL=instructor.controller.js.map