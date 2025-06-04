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
exports.PermitController = void 0;
const common_1 = require("@nestjs/common");
const permit_service_1 = require("./permit.service");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../../guards/jwt-auth.guard");
const roles_1 = require("../../middlewares/roles");
const permit_dto_1 = require("./permit.dto");
let PermitController = class PermitController {
    constructor(service) {
        this.service = service;
    }
    async studentsStats(data) {
        return await this.service.stats(data);
    }
    async findAll(data, req) {
        return await this.service.findAll(data, req.user);
    }
    async details(permitNo) {
        return await this.service.details(permitNo);
    }
    async issuePermit(data, req) {
        return await this.service.issuePermit(data, req.user);
    }
};
exports.PermitController = PermitController;
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Get permit stats',
    }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, roles_1.AllowedRoles)(roles_1.Role.SchoolAdmin, roles_1.Role.MVAA_ADMIN),
    (0, common_1.Get)('/stats'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [permit_dto_1.PermitClassDto]),
    __metadata("design:returntype", Promise)
], PermitController.prototype, "studentsStats", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Get permits list',
    }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, roles_1.AllowedRoles)(roles_1.Role.SchoolAdmin, roles_1.Role.MVAA_ADMIN),
    (0, common_1.Get)('/list'),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], PermitController.prototype, "findAll", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Get permit details',
    }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, roles_1.AllowedRoles)(roles_1.Role.SchoolAdmin, roles_1.Role.MVAA_ADMIN),
    (0, common_1.Get)('/details/:permitNo'),
    __param(0, (0, common_1.Param)('permitNo')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PermitController.prototype, "details", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Issue new permit',
    }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, roles_1.AllowedRoles)(roles_1.Role.SchoolAdmin, roles_1.Role.MVAA_ADMIN),
    (0, common_1.Post)('/new-issuance'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [permit_dto_1.NewPermitRequestDto, Object]),
    __metadata("design:returntype", Promise)
], PermitController.prototype, "issuePermit", null);
exports.PermitController = PermitController = __decorate([
    (0, common_1.Controller)('permit'),
    __metadata("design:paramtypes", [permit_service_1.PermitService])
], PermitController);
//# sourceMappingURL=permit.controller.js.map