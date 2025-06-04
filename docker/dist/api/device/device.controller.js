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
exports.DeviceController = void 0;
const common_1 = require("@nestjs/common");
const device_service_1 = require("./device.service");
const roles_1 = require("../../middlewares/roles");
const roles_2 = require("../../middlewares/roles");
const jwt_auth_guard_1 = require("../../guards/jwt-auth.guard");
const swagger_1 = require("@nestjs/swagger");
const all_dto_1 = require("../../core/interfaces/all.dto");
const device_dto_1 = require("./device.dto");
let DeviceController = class DeviceController {
    constructor(deviceService) {
        this.deviceService = deviceService;
    }
    create(data, req) {
        return this.deviceService.create(data, req.user);
    }
    preActivation(data) {
        return this.deviceService.preActivation(data);
    }
    checkActivationStatus(deviceId) {
        return this.deviceService.checkActivationStatus(deviceId);
    }
    toggleApprovalStatus(data, req) {
        return this.deviceService.toggleApprovalStatus(data, req.user);
    }
    devices(query) {
        return this.deviceService.devices(query);
    }
    async unlinkDevice(imei) {
        if (process.env.NODE_ENV === 'production') {
            return;
        }
        return await this.deviceService.unlinkDevice(imei);
    }
    async deviceStats(req) {
        return await this.deviceService.deviceStats(req.user);
    }
    async getDeviceDetails(id) {
        return await this.deviceService.getDeviceDetails(id);
    }
    async deactivateDevice(imei) {
        return await this.deviceService.deactivateDevice(imei);
    }
};
exports.DeviceController = DeviceController;
__decorate([
    (0, common_1.Post)('/'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, roles_1.AllowedRoles)(roles_2.Role.Admin, roles_2.Role.MVAA_ADMIN, roles_2.Role.LASDRI_ADMIN, roles_2.Role.DVIS_ADMIN),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ description: 'Create Device' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: all_dto_1.MessageResponseDto }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [device_dto_1.CreateDeviceRequestDto, Object]),
    __metadata("design:returntype", Promise)
], DeviceController.prototype, "create", null);
__decorate([
    (0, common_1.Post)('/pre-activation'),
    (0, swagger_1.ApiOperation)({ description: 'Pre-Activation' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: all_dto_1.MessageResponseDto }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [device_dto_1.PreActivationRequestDto]),
    __metadata("design:returntype", Promise)
], DeviceController.prototype, "preActivation", null);
__decorate([
    (0, common_1.Get)('/check-activation-status'),
    (0, swagger_1.ApiOperation)({ description: 'Check node status' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: all_dto_1.MessageResponseDto }),
    __param(0, (0, common_1.Query)('deviceId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DeviceController.prototype, "checkActivationStatus", null);
__decorate([
    (0, common_1.Get)('/toggle-approval'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, roles_1.AllowedRoles)(roles_2.Role.Admin, roles_2.Role.MVAA_ADMIN, roles_2.Role.LASDRI_ADMIN, roles_2.Role.DVIS_ADMIN),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ description: 'Toggle node approval status' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: all_dto_1.MessageResponseDto }),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [device_dto_1.ToggleNodeStatusDto, Object]),
    __metadata("design:returntype", Promise)
], DeviceController.prototype, "toggleApprovalStatus", null);
__decorate([
    (0, common_1.Get)('/list'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, roles_1.AllowedRoles)(roles_2.Role.Admin, roles_2.Role.MVAA_ADMIN, roles_2.Role.LASDRI_ADMIN, roles_2.Role.DVIS_ADMIN),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ description: 'Get devices' }),
    (0, swagger_1.ApiResponse)({ status: 200 }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [device_dto_1.GetDevicesQueryRequestDto]),
    __metadata("design:returntype", Promise)
], DeviceController.prototype, "devices", null);
__decorate([
    (0, common_1.Get)('/unlink/:imei'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, roles_1.AllowedRoles)(roles_2.Role.Admin, roles_2.Role.MVAA_ADMIN, roles_2.Role.LASDRI_ADMIN, roles_2.Role.DVIS_ADMIN),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ description: 'Unlink device' }),
    (0, swagger_1.ApiResponse)({ status: 200 }),
    __param(0, (0, common_1.Param)('imei')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DeviceController.prototype, "unlinkDevice", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Get device stats (LASDRI ADMIN)',
    }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, roles_1.AllowedRoles)(roles_2.Role.LASDRI_ADMIN),
    (0, swagger_1.ApiResponse)({ status: 200, type: device_dto_1.DeviceStatsDto }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Get)('/stats'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DeviceController.prototype, "deviceStats", null);
__decorate([
    (0, common_1.Get)('/details/:id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, roles_1.AllowedRoles)(roles_2.Role.LASDRI_ADMIN),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ description: 'Get device details' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: device_dto_1.DeviceDetailDto }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], DeviceController.prototype, "getDeviceDetails", null);
__decorate([
    (0, common_1.Get)('/deactivate/:imei'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, roles_1.AllowedRoles)(roles_2.Role.LASDRI_ADMIN),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ description: 'Deactivate device (LASDRI ADMIN)' }),
    (0, swagger_1.ApiResponse)({ status: 200 }),
    __param(0, (0, common_1.Param)('imei')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DeviceController.prototype, "deactivateDevice", null);
exports.DeviceController = DeviceController = __decorate([
    (0, common_1.Controller)('device'),
    __metadata("design:paramtypes", [device_service_1.DeviceService])
], DeviceController);
//# sourceMappingURL=device.controller.js.map