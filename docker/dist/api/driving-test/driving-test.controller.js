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
exports.DrivingTestController = void 0;
const common_1 = require("@nestjs/common");
const driving_test_service_1 = require("./driving-test.service");
const swagger_1 = require("@nestjs/swagger");
const driving_school_dto_1 = require("../driving-school/driving-school.dto");
const jwt_auth_guard_1 = require("../../guards/jwt-auth.guard");
const roles_1 = require("../../middlewares/roles");
const all_dto_1 = require("../../core/interfaces/all.dto");
const driving_test_dto_1 = require("./driving-test.dto");
let DrivingTestController = class DrivingTestController {
    constructor(service) {
        this.service = service;
    }
    async getDrivingTestCenters(data) {
        return await this.service.getDrivingTestCenters(data);
    }
    async getSlots(data) {
        return await this.service.getSlots(data);
    }
    async bookSlot(data) {
        return await this.service.bookSlot(data);
    }
    async testHistory(req) {
        return await this.service.testHistory(req);
    }
    async submitDrivingTest(data, req) {
        return await this.service.submitDrivingTest(data, req.user);
    }
    async createCenter(data) {
        return await this.service.createCenter(data);
    }
    async updateCenter(data) {
        return await this.service.updateCenter(data);
    }
    async getFailedAttempts(studentId) {
        return await this.service.getFailedAttempts(studentId);
    }
};
exports.DrivingTestController = DrivingTestController;
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Get list of driving test centers',
    }),
    (0, common_1.Get)('/centers'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [driving_school_dto_1.FetchMasterListDto]),
    __metadata("design:returntype", Promise)
], DrivingTestController.prototype, "getDrivingTestCenters", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Get driving test slots',
    }),
    (0, swagger_1.ApiBody)({ type: driving_test_dto_1.DrivingTestCenterIdDto }),
    (0, common_1.Post)('/slots'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [driving_test_dto_1.DrivingTestCenterIdDto]),
    __metadata("design:returntype", Promise)
], DrivingTestController.prototype, "getSlots", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Book driving test slots',
    }),
    (0, swagger_1.ApiBody)({ type: driving_test_dto_1.BookDrivingTestSlotDto }),
    (0, common_1.Post)('/book-slot'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [driving_test_dto_1.BookDrivingTestSlotDto]),
    __metadata("design:returntype", Promise)
], DrivingTestController.prototype, "bookSlot", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Get test history',
    }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, roles_1.AllowedRoles)(roles_1.Role.DVIS, roles_1.Role.Admin, roles_1.Role.DVIS_ADMIN),
    (0, common_1.Get)('/test-history'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DrivingTestController.prototype, "testHistory", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Submit driving test' }),
    (0, swagger_1.ApiBody)({ type: driving_test_dto_1.SubmitDrivingTestDto }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, roles_1.AllowedRoles)(roles_1.Role.DVIS, roles_1.Role.Admin, roles_1.Role.DVIS_ADMIN),
    (0, common_1.Post)('/submit-driving-test'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [driving_test_dto_1.SubmitDrivingTestDto, Object]),
    __metadata("design:returntype", Promise)
], DrivingTestController.prototype, "submitDrivingTest", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Create driving test center',
    }),
    (0, swagger_1.ApiBody)({ type: driving_test_dto_1.CreateDrivingTestCenterDto }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, roles_1.AllowedRoles)(roles_1.Role.Admin, roles_1.Role.DVIS_ADMIN),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Post)('/centers'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [driving_test_dto_1.CreateDrivingTestCenterDto]),
    __metadata("design:returntype", Promise)
], DrivingTestController.prototype, "createCenter", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Update driving test center',
    }),
    (0, swagger_1.ApiBody)({ type: driving_test_dto_1.UpdateDrivingTestCenterDto }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, roles_1.AllowedRoles)(roles_1.Role.Admin, roles_1.Role.DVIS_ADMIN),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Patch)('/centers'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [driving_test_dto_1.UpdateDrivingTestCenterDto]),
    __metadata("design:returntype", Promise)
], DrivingTestController.prototype, "updateCenter", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Get driving test failed attempts',
    }),
    (0, swagger_1.ApiBody)({ type: all_dto_1.StudentNoDto }),
    (0, common_1.Get)('/failed-attempts/:studentId'),
    __param(0, (0, common_1.Param)('studentId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], DrivingTestController.prototype, "getFailedAttempts", null);
exports.DrivingTestController = DrivingTestController = __decorate([
    (0, common_1.Controller)('driving-test'),
    __metadata("design:paramtypes", [driving_test_service_1.DrivingTestService])
], DrivingTestController);
//# sourceMappingURL=driving-test.controller.js.map