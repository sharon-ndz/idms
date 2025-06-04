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
exports.InspectionController = void 0;
const common_1 = require("@nestjs/common");
const inspection_service_1 = require("./inspection.service");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../../guards/jwt-auth.guard");
const roles_1 = require("../../middlewares/roles");
const inspection_dto_1 = require("./inspection.dto");
let InspectionController = class InspectionController {
    constructor(service) {
        this.service = service;
    }
    async findAll(data, req) {
        return await this.service.findAll(data, req.user);
    }
    async create(data, req) {
        return await this.service.create(data, req.user);
    }
    async getUserInspections(userId, data, req) {
        return await this.service.getUserInspections(userId, data, req.user);
    }
    async getInspectionQuestions(stateId, data, req) {
        const user = req.user;
        return await this.service.getInspectionQuestions(data, stateId, user);
    }
    async getSingle(id, req) {
        return await this.service.getSingle(id);
    }
    async uploadQuestions(data, req) {
        return await this.service.uploadQuestions(data, req.user);
    }
    async submitInspection(data, req) {
        return await this.service.submitInspection(data, req.user);
    }
};
exports.InspectionController = InspectionController;
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Get inspection list',
    }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, roles_1.AllowedRoles)(roles_1.Role.SchoolAdmin, roles_1.Role.LASDRI_ADMIN),
    (0, common_1.Get)('/'),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [inspection_dto_1.ListInspectionsDto, Object]),
    __metadata("design:returntype", Promise)
], InspectionController.prototype, "findAll", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Create inspection',
    }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, roles_1.AllowedRoles)(roles_1.Role.Admin, roles_1.Role.LASDRI_ADMIN),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [inspection_dto_1.NewInspectionDto, Object]),
    __metadata("design:returntype", Promise)
], InspectionController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Retrieve user inspection list',
    }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, roles_1.AllowedRoles)(roles_1.Role.LASDRI_ADMIN),
    (0, common_1.Get)('/:userId'),
    __param(0, (0, common_1.Param)('userId')),
    __param(1, (0, common_1.Query)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, inspection_dto_1.ListInspectionsDto, Object]),
    __metadata("design:returntype", Promise)
], InspectionController.prototype, "getUserInspections", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Get inspection questions by state',
    }),
    (0, swagger_1.ApiResponse)({ status: 200, type: inspection_dto_1.InspectionQuestionResDto }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, roles_1.AllowedRoles)(roles_1.Role.LASDRI, roles_1.Role.SchoolAdmin),
    (0, common_1.Get)('/get-questions/:stateId'),
    __param(0, (0, common_1.Param)('stateId')),
    __param(1, (0, common_1.Query)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, inspection_dto_1.ListInspectionsQuestionsDto, Object]),
    __metadata("design:returntype", Promise)
], InspectionController.prototype, "getInspectionQuestions", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Get single inspection',
    }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, roles_1.AllowedRoles)(roles_1.Role.LASDRI_ADMIN),
    (0, common_1.Get)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], InspectionController.prototype, "getSingle", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Upload inspection questions',
    }),
    (0, swagger_1.ApiResponse)({ status: 200 }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, roles_1.AllowedRoles)(roles_1.Role.Admin, roles_1.Role.SchoolAdmin),
    (0, common_1.Post)('/upload-questions'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [inspection_dto_1.InspectionQuestionReqDto, Object]),
    __metadata("design:returntype", Promise)
], InspectionController.prototype, "uploadQuestions", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Submit inspection',
    }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, roles_1.AllowedRoles)(roles_1.Role.LASDRI, roles_1.Role.SchoolAdmin),
    (0, common_1.Post)('/submit-inspection'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [inspection_dto_1.NewInspectionDto, Object]),
    __metadata("design:returntype", Promise)
], InspectionController.prototype, "submitInspection", null);
exports.InspectionController = InspectionController = __decorate([
    (0, common_1.Controller)('inspections'),
    __metadata("design:paramtypes", [inspection_service_1.InspectionService])
], InspectionController);
//# sourceMappingURL=inspection.controller.js.map