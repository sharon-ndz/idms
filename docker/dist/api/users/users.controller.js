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
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("./users.service");
const jwt_auth_guard_1 = require("../../guards/jwt-auth.guard");
const swagger_1 = require("@nestjs/swagger");
const users_dto_1 = require("./users.dto");
const roles_1 = require("../../middlewares/roles");
let UsersController = class UsersController {
    constructor(service) {
        this.service = service;
    }
    async stats(req) {
        return await this.service.stats(req.user);
    }
    async findAll(data, req) {
        return await this.service.findAll(data, req.user);
    }
    async getSingle(userId, req) {
        return this.service.getSingle(userId, req.user);
    }
    async createUser(data, req) {
        return this.service.createUser(data, req.user);
    }
    async updateUser(data, req) {
        return await this.service.updateUser(data, req.user);
    }
    async getProfile(req) {
        return await this.service.getProfile(req.user);
    }
    async updateProfile(data, req) {
        return await this.service.updateProfile(data, req.user);
    }
    async updateUserBiometrics(data) {
        return this.service.updateUserBiometrics(data);
    }
    async updateUserTest(data, req) {
        return await this.service.updateUser(data, req.user);
    }
    async findAllTest(data, req) {
        return await this.service.findAll(data, req.user);
    }
    async toggleUserStatus(id, data, req) {
        return await this.service.toggleUserStatus(id, data, req.user);
    }
    async getMySchoolApplication(req) {
        return await this.service.getMySchoolApplication(req.user);
    }
};
exports.UsersController = UsersController;
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Get users stats',
    }),
    (0, swagger_1.ApiResponse)({ status: 200, type: users_dto_1.UserStatsDto }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, roles_1.AllowedRoles)(roles_1.Role.Admin, roles_1.Role.DVIS_ADMIN, roles_1.Role.LASDRI_ADMIN, roles_1.Role.MVAA_ADMIN),
    (0, common_1.Get)('/stats'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "stats", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Get all users',
    }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, roles_1.AllowedRoles)(roles_1.Role.Admin, roles_1.Role.DVIS_ADMIN, roles_1.Role.LASDRI_ADMIN, roles_1.Role.MVAA_ADMIN),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_dto_1.UserListRequestDto, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "findAll", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Get single user',
    }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, roles_1.AllowedRoles)(roles_1.Role.Admin, roles_1.Role.DVIS_ADMIN, roles_1.Role.LASDRI_ADMIN, roles_1.Role.MVAA_ADMIN),
    (0, common_1.Get)('/single/:userId'),
    __param(0, (0, common_1.Param)('userId')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getSingle", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Create user',
    }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, roles_1.AllowedRoles)(roles_1.Role.Admin, roles_1.Role.DVIS_ADMIN, roles_1.Role.LASDRI_ADMIN, roles_1.Role.MVAA_ADMIN),
    (0, common_1.Post)('/'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_dto_1.CreateUserDto, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "createUser", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Update user',
    }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, roles_1.AllowedRoles)(roles_1.Role.Admin, roles_1.Role.DVIS_ADMIN, roles_1.Role.LASDRI_ADMIN, roles_1.Role.MVAA_ADMIN),
    (0, common_1.Patch)('/'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_dto_1.UpdateUserDto, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "updateUser", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Get my profile',
    }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('/me'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getProfile", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Update my profile',
    }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Patch)('/me'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_dto_1.UpdateMeDto, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "updateProfile", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Update user biometrics',
    }),
    (0, swagger_1.ApiBody)({ type: users_dto_1.AttachUserBiometricsDto }),
    (0, common_1.Post)('/update-biometrics'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_dto_1.AttachUserBiometricsDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "updateUserBiometrics", null);
__decorate([
    (0, common_1.Patch)('/test-update'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_dto_1.UpdateUserDto, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "updateUserTest", null);
__decorate([
    (0, common_1.Get)('/test-list'),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_dto_1.UserListRequestDto, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "findAllTest", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Toggle user status (LASDRI ADMIN)',
    }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, roles_1.AllowedRoles)(roles_1.Role.LASDRI_ADMIN),
    (0, common_1.Patch)('/toggle-status/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, users_dto_1.toggleUserStatusDto, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "toggleUserStatus", null);
__decorate([
    (0, common_1.Get)('/driving-school-application'),
    (0, swagger_1.ApiOperation)({
        summary: 'Get my driving school application',
    }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, roles_1.AllowedRoles)(roles_1.Role.SchoolAdmin),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getMySchoolApplication", null);
exports.UsersController = UsersController = __decorate([
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UsersController);
//# sourceMappingURL=users.controller.js.map