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
exports.DrivingSchoolController = void 0;
const common_1 = require("@nestjs/common");
const driving_school_service_1 = require("./driving-school.service");
const driving_school_dto_1 = require("./driving-school.dto");
const jwt_auth_guard_1 = require("../../guards/jwt-auth.guard");
const swagger_1 = require("@nestjs/swagger");
const all_dto_1 = require("../../core/interfaces/all.dto");
const roles_1 = require("../../middlewares/roles");
const users_dto_1 = require("../users/users.dto");
let DrivingSchoolController = class DrivingSchoolController {
    constructor(service) {
        this.service = service;
    }
    async stats(req) {
        return await this.service.stats(req.user);
    }
    async findAll(data, req) {
        return await this.service.findAll(data, req.user);
    }
    async createSchool(data, req) {
        return this.service.createSchool(data, req.user);
    }
    async selfServiceCreateSchool(data) {
        return this.service.selfServiceCreateSchool(data);
    }
    async updateSchool(data, req) {
        return await this.service.updateSchool(data, req.user);
    }
    async minimalList(data) {
        return await this.service.minimalList(data);
    }
    async findOne(id) {
        return await this.service.findOne(+id);
    }
    async trainingDurations(id) {
        return await this.service.trainingDurations(+id);
    }
    async singleTrainingDuration(id) {
        return await this.service.singleTrainingDuration(+id);
    }
    async submitApplication(data) {
        return await this.service.submitApplication(data);
    }
    async updateApplication(data) {
        return await this.service.updateApplication(data);
    }
    async checkApplication(data) {
        return await this.service.checkApplication(data);
    }
    async issueCert(studentNo) {
        return await this.service.issueCert(studentNo);
    }
    async validateCertNo(certificateNo) {
        return await this.service.validateCertNo(certificateNo);
    }
    async applicationsStats(data, req) {
        return await this.service.applicationsStats(data, req.user);
    }
    async applicationsList(data, req) {
        return await this.service.applicationsList(data, req.user);
    }
    async getSingleApplication(drivingSchoolId) {
        return this.service.getSingleApplication(drivingSchoolId);
    }
    async changeApplicationStatus(data, req) {
        return await this.service.changeApplicationStatus(data, req.user);
    }
    async studentsStats(data, req) {
        return await this.service.studentsStats(data, req.user);
    }
    async studentsList(data, req) {
        return await this.service.studentsList(data, req.user);
    }
    async studentDetails(studentNo) {
        return await this.service.studentDetails(studentNo);
    }
    async registerStudent(data, req) {
        return await this.service.registerStudent(data, req.user);
    }
    async lasdriStats(req) {
        return await this.service.getLasdriStats(req.user);
    }
    async getDrivingSchoolList(data) {
        return await this.service.getDrivingSchoolList(data);
    }
    async assignLasdriOfficer(data, req) {
        return await this.service.assignLasdriOfficer(data, req.user);
    }
    async completeApplication(data, req) {
        const user = req.user;
        return this.service.completeApplication(data, user);
    }
    async toggleDrivingSchoolStatus(id, data, req) {
        return await this.service.toggleDrivingSchoolStatus(id, data, req.user);
    }
    async drivingSchoolInspections(drivingSchoolId, data) {
        return await this.service.drivingSchoolInspections(drivingSchoolId, data);
    }
    async confirmApplicationPayment(paymentRef, req) {
        return await this.service.confirmApplicationPayment(paymentRef, req.user);
    }
    async queryApplication(drivingSchoolId, data, req) {
        return await this.service.queryApplication(drivingSchoolId, data.reason, req.user);
    }
    async requestInspection(req) {
        return await this.service.requestInspection(req.user);
    }
    async dashboardStats(data) {
        return await this.service.dashboardStats(data);
    }
    async listLasdriOfficers(data) {
        return await this.service.listLasdriOfficers(data);
    }
};
exports.DrivingSchoolController = DrivingSchoolController;
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Get driving school stats',
    }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, roles_1.AllowedRoles)(roles_1.Role.Admin, roles_1.Role.LASDRI_ADMIN),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Get)('/stats'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DrivingSchoolController.prototype, "stats", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Get all driving schools',
    }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, roles_1.AllowedRoles)(roles_1.Role.Admin, roles_1.Role.LASDRI_ADMIN),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Get)('/list'),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [driving_school_dto_1.ListApplicationsDto, Object]),
    __metadata("design:returntype", Promise)
], DrivingSchoolController.prototype, "findAll", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Create driving school',
    }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, roles_1.AllowedRoles)(roles_1.Role.Admin, roles_1.Role.LASDRI_ADMIN),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [driving_school_dto_1.DrivingSchoolDto, Object]),
    __metadata("design:returntype", Promise)
], DrivingSchoolController.prototype, "createSchool", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Create driving school [Self Service Portal]',
    }),
    (0, swagger_1.ApiBody)({ type: driving_school_dto_1.SelfServiceCreateSchoolDto }),
    (0, common_1.Post)('/self-service/create'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [driving_school_dto_1.SelfServiceCreateSchoolDto]),
    __metadata("design:returntype", Promise)
], DrivingSchoolController.prototype, "selfServiceCreateSchool", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Update driving school',
    }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, roles_1.AllowedRoles)(roles_1.Role.Admin, roles_1.Role.LASDRI_ADMIN),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Patch)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [driving_school_dto_1.UpdateDrivingSchoolDto, Object]),
    __metadata("design:returntype", Promise)
], DrivingSchoolController.prototype, "updateSchool", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Master list to get all driving schools',
    }),
    (0, common_1.Get)('/'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [driving_school_dto_1.FetchMasterListDto]),
    __metadata("design:returntype", Promise)
], DrivingSchoolController.prototype, "minimalList", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Fetch single driving school',
    }),
    (0, common_1.Get)('single/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DrivingSchoolController.prototype, "findOne", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Get a driving school training durations',
    }),
    (0, common_1.Get)('/training-durations/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DrivingSchoolController.prototype, "trainingDurations", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Get single training duration',
    }),
    (0, common_1.Get)('/training-duration/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DrivingSchoolController.prototype, "singleTrainingDuration", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Submit driving school application',
    }),
    (0, swagger_1.ApiBody)({
        type: driving_school_dto_1.SubmitDrivingSchoolApplicationDto,
    }),
    (0, common_1.Post)('/submit-application'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [driving_school_dto_1.SubmitDrivingSchoolApplicationDto]),
    __metadata("design:returntype", Promise)
], DrivingSchoolController.prototype, "submitApplication", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Update driving school application',
    }),
    (0, swagger_1.ApiBody)({
        type: driving_school_dto_1.UpdateDrivingSchoolApplicationDto,
    }),
    (0, common_1.Post)('/update-application'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [driving_school_dto_1.UpdateDrivingSchoolApplicationDto]),
    __metadata("design:returntype", Promise)
], DrivingSchoolController.prototype, "updateApplication", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Check or pull driving school application with status',
    }),
    (0, swagger_1.ApiBody)({
        type: all_dto_1.ApplicationNoDto,
    }),
    (0, common_1.Post)('/check-application'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [all_dto_1.ApplicationNoDto]),
    __metadata("design:returntype", Promise)
], DrivingSchoolController.prototype, "checkApplication", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Issue Certificate for student who have successfully completed training. (TEST ONlY)',
    }),
    (0, common_1.Get)('/students/issue-cert/:studentNo'),
    __param(0, (0, common_1.Param)('studentNo')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DrivingSchoolController.prototype, "issueCert", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Validate certificate for student who have successfully completed training.',
    }),
    (0, common_1.Post)('/validate-cert-no'),
    __param(0, (0, common_1.Body)('certificateNo')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DrivingSchoolController.prototype, "validateCertNo", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Get applications stats',
    }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, roles_1.AllowedRoles)(roles_1.Role.SchoolAdmin, roles_1.Role.LASDRI_ADMIN),
    (0, swagger_1.ApiResponse)({ status: 200, type: driving_school_dto_1.DrivingSchoolApplicationStatsDto }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Get)('/applications/stats'),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [driving_school_dto_1.ApplicationStatsDto, Object]),
    __metadata("design:returntype", Promise)
], DrivingSchoolController.prototype, "applicationsStats", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Get all applications',
    }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, roles_1.AllowedRoles)(roles_1.Role.SchoolAdmin, roles_1.Role.LASDRI_ADMIN),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Get)('/applications/list'),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [driving_school_dto_1.ListApplicationsDto, Object]),
    __metadata("design:returntype", Promise)
], DrivingSchoolController.prototype, "applicationsList", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Get single application (SchoolAdmin, LASDRI-ADMIN)',
    }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, roles_1.AllowedRoles)(roles_1.Role.SchoolAdmin, roles_1.Role.LASDRI_ADMIN),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Get)('/applications/details/:drivingSchoolId'),
    __param(0, (0, common_1.Param)('drivingSchoolId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], DrivingSchoolController.prototype, "getSingleApplication", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Acknowledge application [Admin]',
    }),
    (0, swagger_1.ApiBody)({
        type: driving_school_dto_1.ActionDrivingSchoolApplicationDto,
    }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, roles_1.AllowedRoles)(roles_1.Role.SchoolAdmin, roles_1.Role.LASDRI_ADMIN),
    (0, common_1.Post)('/change-application-status'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [driving_school_dto_1.ActionDrivingSchoolApplicationDto, Object]),
    __metadata("design:returntype", Promise)
], DrivingSchoolController.prototype, "changeApplicationStatus", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Get student stats (School Admin, LASDRI ADMIN)',
    }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, roles_1.AllowedRoles)(roles_1.Role.SchoolAdmin, roles_1.Role.LASDRI_ADMIN),
    (0, common_1.Get)('/students/stats'),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [driving_school_dto_1.FetchStudentListDto, Object]),
    __metadata("design:returntype", Promise)
], DrivingSchoolController.prototype, "studentsStats", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Get students list  (School Admin, LASDRI ADMIN)',
    }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, roles_1.AllowedRoles)(roles_1.Role.SchoolAdmin, roles_1.Role.LASDRI_ADMIN),
    (0, common_1.Get)('/students'),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [driving_school_dto_1.FetchStudentListDto, Object]),
    __metadata("design:returntype", Promise)
], DrivingSchoolController.prototype, "studentsList", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Get student details',
    }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, roles_1.AllowedRoles)(roles_1.Role.SchoolAdmin, roles_1.Role.LASDRI_ADMIN),
    (0, common_1.Post)('/students/details/:studentNo'),
    __param(0, (0, common_1.Param)('studentNo')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DrivingSchoolController.prototype, "studentDetails", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Register student',
    }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, roles_1.AllowedRoles)(roles_1.Role.SchoolAdmin, roles_1.Role.LASDRI_ADMIN),
    (0, common_1.Post)('/students/register'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [driving_school_dto_1.SubmitDrivingSchoolApplicationDto, Object]),
    __metadata("design:returntype", Promise)
], DrivingSchoolController.prototype, "registerStudent", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Get driving school stats (LASDRI ADMIN)',
    }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, roles_1.AllowedRoles)(roles_1.Role.LASDRI_ADMIN),
    (0, swagger_1.ApiResponse)({ status: 200, type: driving_school_dto_1.DrivingSchoolStatsDto }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Get)('/lasdri/stats'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DrivingSchoolController.prototype, "lasdriStats", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'List Driving Schools (LASDRI ADMIN)',
    }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiResponse)({ status: 200, type: driving_school_dto_1.DrivingSchoolDto }),
    (0, roles_1.AllowedRoles)(roles_1.Role.LASDRI_ADMIN),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Get)('/lasdri/list'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [driving_school_dto_1.DirivinSchoolListRequestsDto]),
    __metadata("design:returntype", Promise)
], DrivingSchoolController.prototype, "getDrivingSchoolList", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Assign LASDRI officer to driving school (LASDRI ADMIN)',
    }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, roles_1.AllowedRoles)(roles_1.Role.LASDRI_ADMIN),
    (0, common_1.Post)('/lasdri/assign-officer'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [driving_school_dto_1.AssignOfficerDto, Object]),
    __metadata("design:returntype", Promise)
], DrivingSchoolController.prototype, "assignLasdriOfficer", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Complete driving school application (Driving School)',
    }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, roles_1.AllowedRoles)(roles_1.Role.SchoolAdmin),
    (0, swagger_1.ApiResponse)({ status: 200 }),
    (0, common_1.Post)('/complete-application'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [driving_school_dto_1.CompleteSchoolApplicationDto, Object]),
    __metadata("design:returntype", Promise)
], DrivingSchoolController.prototype, "completeApplication", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Toggle driving school status (LASDRI ADMIN)',
    }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, roles_1.AllowedRoles)(roles_1.Role.LASDRI_ADMIN),
    (0, common_1.Patch)('/toggle-status/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, driving_school_dto_1.toggleSchoolStatusDto, Object]),
    __metadata("design:returntype", Promise)
], DrivingSchoolController.prototype, "toggleDrivingSchoolStatus", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Fetch driving school inpections (LASDRI ADMIN)',
    }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, roles_1.AllowedRoles)(roles_1.Role.LASDRI_ADMIN),
    (0, common_1.Get)('inspections/:drivingSchoolId'),
    __param(0, (0, common_1.Param)('drivingSchoolId')),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, driving_school_dto_1.listDrivingSchoolInspectionsDto]),
    __metadata("design:returntype", Promise)
], DrivingSchoolController.prototype, "drivingSchoolInspections", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Confirm driving school application payment (Driving School)',
    }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, roles_1.AllowedRoles)(roles_1.Role.SchoolAdmin),
    (0, common_1.Post)('/confirm-application-payment/:paymentRef'),
    __param(0, (0, common_1.Param)('paymentRef')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], DrivingSchoolController.prototype, "confirmApplicationPayment", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Query driving school application (LASDRI ADMIN)',
    }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, roles_1.AllowedRoles)(roles_1.Role.LASDRI_ADMIN),
    (0, common_1.Post)('/query-application/:drivingSchoolId'),
    __param(0, (0, common_1.Param)('drivingSchoolId')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, driving_school_dto_1.DrivingSchoolQueryApplicationDto, Object]),
    __metadata("design:returntype", Promise)
], DrivingSchoolController.prototype, "queryApplication", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Request for inspection (Driving School)',
    }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, roles_1.AllowedRoles)(roles_1.Role.SchoolAdmin),
    (0, common_1.Post)('/request-inspection'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DrivingSchoolController.prototype, "requestInspection", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Get dashboard stats (Driving School)',
    }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, roles_1.AllowedRoles)(roles_1.Role.LASDRI_ADMIN),
    (0, common_1.Get)('/dashboard/stats'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [driving_school_dto_1.FetchDashboardStatsRequestDto]),
    __metadata("design:returntype", Promise)
], DrivingSchoolController.prototype, "dashboardStats", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'List LASDRI Officers (LASDRI ADMIN)',
    }),
    (0, swagger_1.ApiResponse)({ status: 200, type: [users_dto_1.UserResponseDto] }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, roles_1.AllowedRoles)(roles_1.Role.LASDRI_ADMIN),
    (0, common_1.Get)('/list-lasdri-officers'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [all_dto_1.BaseRequestDto]),
    __metadata("design:returntype", Promise)
], DrivingSchoolController.prototype, "listLasdriOfficers", null);
exports.DrivingSchoolController = DrivingSchoolController = __decorate([
    (0, common_1.Controller)('driving-school'),
    __metadata("design:paramtypes", [driving_school_service_1.DrivingSchoolService])
], DrivingSchoolController);
//# sourceMappingURL=driving-school.controller.js.map