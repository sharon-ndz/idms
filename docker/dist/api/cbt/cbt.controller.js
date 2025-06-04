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
exports.CbtController = void 0;
const common_1 = require("@nestjs/common");
const cbt_service_1 = require("./cbt.service");
const swagger_1 = require("@nestjs/swagger");
const driving_school_dto_1 = require("../driving-school/driving-school.dto");
const cbt_dto_1 = require("./cbt.dto");
const jwt_auth_guard_1 = require("../../guards/jwt-auth.guard");
const roles_1 = require("../../middlewares/roles");
const all_dto_1 = require("../../core/interfaces/all.dto");
let CbtController = class CbtController {
    constructor(service) {
        this.service = service;
    }
    async getCbtCenters(data) {
        return await this.service.getCbtCenters(data);
    }
    async getSlots(data) {
        return await this.service.getSlots(data);
    }
    async bookSlot(data) {
        return await this.service.bookSlot(data);
    }
    async getTestByStudent(data) {
        return await this.service.getTestByStudent(data);
    }
    async submitTest(data) {
        return await this.service.submitTest(data);
    }
    async cbtEnrolls(req) {
        return await this.service.cbtEnrolls(req);
    }
    async createCenter(data) {
        return await this.service.createCenter(data);
    }
    async updateCenter(data) {
        return await this.service.updateCenter(data);
    }
    async questionList(data) {
        return await this.service.questionList(data);
    }
    async updateQuestion(data, req) {
        return await this.service.updateQuestion(data, req.user);
    }
    async createQuestion(data, req) {
        return await this.service.createQuestion(data, req.user);
    }
    async getFailedAttempts(studentId) {
        return await this.service.getFailedAttempts(studentId);
    }
    async rescheduleCbt(data) {
        return await this.service.rescheduleCbt(data);
    }
};
exports.CbtController = CbtController;
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Get list of CBT centers',
    }),
    (0, common_1.Get)('/centers'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [driving_school_dto_1.FetchMasterListDto]),
    __metadata("design:returntype", Promise)
], CbtController.prototype, "getCbtCenters", null);
__decorate([
    (0, common_1.Post)('/slots'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [cbt_dto_1.CbtCenterIdDto]),
    __metadata("design:returntype", Promise)
], CbtController.prototype, "getSlots", null);
__decorate([
    (0, common_1.Post)('/book-slot'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [cbt_dto_1.BookSlotDto]),
    __metadata("design:returntype", Promise)
], CbtController.prototype, "bookSlot", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Get questions by student',
    }),
    (0, common_1.Post)('/question/by-student'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [cbt_dto_1.QuestionByStudentDto]),
    __metadata("design:returntype", Promise)
], CbtController.prototype, "getTestByStudent", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Submit student test',
    }),
    (0, common_1.Post)('/question/submit-test'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [cbt_dto_1.SubmitTestDto]),
    __metadata("design:returntype", Promise)
], CbtController.prototype, "submitTest", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Get CBT enrolls',
    }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, roles_1.AllowedRoles)(roles_1.Role.DVIS, roles_1.Role.Admin, roles_1.Role.SchoolAdmin, roles_1.Role.DVIS_ADMIN),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Get)('/enrolls'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CbtController.prototype, "cbtEnrolls", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Create CBT center',
    }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, roles_1.AllowedRoles)(roles_1.Role.Admin, roles_1.Role.DVIS_ADMIN),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Post)('/centers'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [cbt_dto_1.CreateCbtCenterDto]),
    __metadata("design:returntype", Promise)
], CbtController.prototype, "createCenter", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Update CBT center',
    }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, roles_1.AllowedRoles)(roles_1.Role.Admin, roles_1.Role.DVIS_ADMIN),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Patch)('/centers'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [cbt_dto_1.UpdateCbtCenterDto]),
    __metadata("design:returntype", Promise)
], CbtController.prototype, "updateCenter", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Get questions list',
    }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, roles_1.AllowedRoles)(roles_1.Role.Admin, roles_1.Role.DVIS_ADMIN),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Get)('/question'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [cbt_dto_1.FetchQuestionsDto]),
    __metadata("design:returntype", Promise)
], CbtController.prototype, "questionList", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Update Question',
    }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, roles_1.AllowedRoles)(roles_1.Role.Admin, roles_1.Role.DVIS_ADMIN),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Patch)('/question'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [cbt_dto_1.UpdateQuestionDto, Object]),
    __metadata("design:returntype", Promise)
], CbtController.prototype, "updateQuestion", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Create Question',
    }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, roles_1.AllowedRoles)(roles_1.Role.Admin, roles_1.Role.DVIS_ADMIN),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Post)('/question'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [cbt_dto_1.CreateQuestionDto, Object]),
    __metadata("design:returntype", Promise)
], CbtController.prototype, "createQuestion", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Get CBT failed attempts',
    }),
    (0, swagger_1.ApiBody)({ type: all_dto_1.StudentNoDto }),
    (0, common_1.Get)('/failed-attempts/:studentId'),
    __param(0, (0, common_1.Param)('studentId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CbtController.prototype, "getFailedAttempts", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'CBT Reschedule',
    }),
    (0, swagger_1.ApiBody)({ type: cbt_dto_1.CbtRescheduleDto }),
    (0, common_1.Post)('/reschedule'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [cbt_dto_1.CbtRescheduleDto]),
    __metadata("design:returntype", Promise)
], CbtController.prototype, "rescheduleCbt", null);
exports.CbtController = CbtController = __decorate([
    (0, common_1.Controller)('cbt'),
    __metadata("design:paramtypes", [cbt_service_1.CbtService])
], CbtController);
//# sourceMappingURL=cbt.controller.js.map