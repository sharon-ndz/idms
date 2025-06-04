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
exports.LicenseController = void 0;
const common_1 = require("@nestjs/common");
const license_service_1 = require("./license.service");
const swagger_1 = require("@nestjs/swagger");
const license_dto_1 = require("./license.dto");
const all_dto_1 = require("../../core/interfaces/all.dto");
const jwt_auth_guard_1 = require("../../guards/jwt-auth.guard");
const roles_1 = require("../../middlewares/roles");
let LicenseController = class LicenseController {
    constructor(service) {
        this.service = service;
    }
    getLicenseSummary() {
        return this.service.getLicenseSummary();
    }
    getMonthlyLicenseVolume(data) {
        return this.service.getMonthlyLicenseVolume(data);
    }
    getRenewalRate(startDate, endDate) {
        return this.service.getRenewalRate(new Date(startDate), new Date(endDate));
    }
    getTopExpiredLicensesByState(startDate, endDate) {
        return this.service.getTopExpiredLicensesByLga(new Date(startDate), new Date(endDate));
    }
    getGenderDistribution(startDate, endDate) {
        return this.service.getGenderDistribution(new Date(startDate), new Date(endDate));
    }
    async stats(type, req) {
        return await this.service.stats(type, req.user);
    }
    async findAll(data, req) {
        return await this.service.findAll(data, req.user);
    }
    async preRegistrations(data, req) {
        return await this.service.preRegistrations(data, req.user);
    }
    async details(data) {
        return await this.service.details(data);
    }
    async detailsByLicenseNo(data) {
        return await this.service.detailsByLicenseNo(data);
    }
    async verifyLicense(data) {
        return await this.service.verifyLicense(data);
    }
    async preRegistration(data, req) {
        return await this.service.preRegistration(data, req);
    }
    async getPreRegistration(applicationNo) {
        return await this.service.getPreRegistration(applicationNo);
    }
    async preRegistrationDetailsByStudent(studentId) {
        return await this.service.preRegistrationDetailsByStudent(studentId);
    }
    async submitNewRequest(data) {
        return await this.service.submitNewRequest(data);
    }
    async licenseRenewalPreRegistration(data, req) {
        return await this.service.licenseRenewalPreRegistration(data, req);
    }
    async submitRenewalRequest(data, req) {
        return await this.service.submitRenewalRequest(data, req);
    }
    async mobileSubmitRenewalRequest(data, req) {
        return await this.service.mobileSubmitRenewalRequest(data, req);
    }
    async submitReplacementRequest(data, req) {
        return await this.service.submitReplacementRequest(data, req);
    }
    async mobileSubmitReplacementRequest(data, req) {
        return await this.service.mobileSubmitReplacementRequest(data, req);
    }
    async submitPreRegistrationFiles(data) {
        return await this.service.submitPreRegistrationFiles(data);
    }
    async approveLicense(data, req) {
        return await this.service.approveLicense(data, req.user);
    }
    async updateLicense(data) {
        return await this.service.updateLicense(data);
    }
    async expireLicense(data) {
        return await this.service.expireLicense(data);
    }
};
exports.LicenseController = LicenseController;
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Calculates total licenses, renewed, replaced, and expired licenses.',
    }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, roles_1.AllowedRoles)(roles_1.Role.Admin, roles_1.Role.MVAA_ADMIN),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Get)('/dashboard/summary'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], LicenseController.prototype, "getLicenseSummary", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Monthly license volume for current year.',
    }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, roles_1.AllowedRoles)(roles_1.Role.Admin, roles_1.Role.MVAA_ADMIN),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Get)('/dashboard/monthly-volume'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [license_dto_1.LicenseStatsWithYearDto]),
    __metadata("design:returntype", void 0)
], LicenseController.prototype, "getMonthlyLicenseVolume", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Calculates the renewal rate as a percentage.',
    }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, roles_1.AllowedRoles)(roles_1.Role.Admin, roles_1.Role.MVAA_ADMIN),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Get)('/dashboard/renewal-rate'),
    __param(0, (0, common_1.Query)('startDate')),
    __param(1, (0, common_1.Query)('endDate')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], LicenseController.prototype, "getRenewalRate", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: ' Fetches the top 5 states with the most expired licenses.',
    }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, roles_1.AllowedRoles)(roles_1.Role.Admin, roles_1.Role.MVAA_ADMIN),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Get)('/dashboard/top-expired-lgas'),
    __param(0, (0, common_1.Query)('startDate')),
    __param(1, (0, common_1.Query)('endDate')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], LicenseController.prototype, "getTopExpiredLicensesByState", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Fetches gender distribution within a date range.',
    }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, roles_1.AllowedRoles)(roles_1.Role.Admin, roles_1.Role.MVAA_ADMIN),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Get)('/dashboard/gender-distribution'),
    __param(0, (0, common_1.Query)('startDate')),
    __param(1, (0, common_1.Query)('endDate')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], LicenseController.prototype, "getGenderDistribution", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Get license stats',
    }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, roles_1.AllowedRoles)(roles_1.Role.Admin, roles_1.Role.MVAA_ADMIN),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Get)('/stats'),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [license_dto_1.LicenseStatsDto, Object]),
    __metadata("design:returntype", Promise)
], LicenseController.prototype, "stats", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Get all licenses',
    }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, roles_1.AllowedRoles)(roles_1.Role.Admin, roles_1.Role.MVAA_ADMIN),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], LicenseController.prototype, "findAll", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Get all pre registrations',
    }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, roles_1.AllowedRoles)(roles_1.Role.Admin, roles_1.Role.MVAA_ADMIN),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Get)('/pre-registrations'),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], LicenseController.prototype, "preRegistrations", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Get license details by application id',
    }),
    (0, common_1.Post)('/details'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [all_dto_1.ApplicationNoDto]),
    __metadata("design:returntype", Promise)
], LicenseController.prototype, "details", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Get license details by license number',
    }),
    (0, common_1.Post)('/details-by-license-no'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [all_dto_1.LicenseNoDto]),
    __metadata("design:returntype", Promise)
], LicenseController.prototype, "detailsByLicenseNo", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Verify license',
    }),
    (0, common_1.Post)('/verify'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [license_dto_1.ValidateLicenseDto]),
    __metadata("design:returntype", Promise)
], LicenseController.prototype, "verifyLicense", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Submit pre registration for license request',
    }),
    (0, swagger_1.ApiBody)({
        type: license_dto_1.PreRegistrationRequestDto,
    }),
    (0, common_1.Post)('/pre-registration'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [license_dto_1.PreRegistrationRequestDto, Object]),
    __metadata("design:returntype", Promise)
], LicenseController.prototype, "preRegistration", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Get pre registration data by applicationNo',
    }),
    (0, common_1.Post)('/single/pre-registration'),
    __param(0, (0, common_1.Body)('applicationNo')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], LicenseController.prototype, "getPreRegistration", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Get pre-registration details by student id',
    }),
    (0, common_1.Get)('/single/pre-registration/:studentId'),
    __param(0, (0, common_1.Param)('studentId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], LicenseController.prototype, "preRegistrationDetailsByStudent", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Submit new license request',
    }),
    (0, swagger_1.ApiBody)({
        type: license_dto_1.NewLicenseRequestDto,
    }),
    (0, common_1.Post)('/submit-new-request'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [license_dto_1.NewLicenseRequestDto]),
    __metadata("design:returntype", Promise)
], LicenseController.prototype, "submitNewRequest", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Submit pre registration for license renewal request',
    }),
    (0, swagger_1.ApiBody)({
        type: license_dto_1.RenewalPreRegistrationDto,
    }),
    (0, common_1.Post)('/pre-registration/renewal'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [license_dto_1.RenewalPreRegistrationDto, Object]),
    __metadata("design:returntype", Promise)
], LicenseController.prototype, "licenseRenewalPreRegistration", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Submit renewal license request',
    }),
    (0, swagger_1.ApiBody)({
        type: license_dto_1.RenewalLicenseRequestDto,
    }),
    (0, common_1.Post)('/submit-renewal-request'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [license_dto_1.RenewalLicenseRequestDto, Object]),
    __metadata("design:returntype", Promise)
], LicenseController.prototype, "submitRenewalRequest", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Submit renewal license request for mobile',
    }),
    (0, swagger_1.ApiBody)({
        type: license_dto_1.MobileRenewalLicenseRequestDto,
    }),
    (0, common_1.Post)('/mobile/submit-renewal-request'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [license_dto_1.MobileRenewalLicenseRequestDto, Object]),
    __metadata("design:returntype", Promise)
], LicenseController.prototype, "mobileSubmitRenewalRequest", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Submit replacement license request',
    }),
    (0, swagger_1.ApiBody)({
        type: license_dto_1.ReplaceLicenseRequestDto,
    }),
    (0, common_1.Post)('/submit-replacement-request'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [license_dto_1.ReplaceLicenseRequestDto, Object]),
    __metadata("design:returntype", Promise)
], LicenseController.prototype, "submitReplacementRequest", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Submit replacement license request for mobile',
    }),
    (0, swagger_1.ApiBody)({
        type: license_dto_1.MobileReplaceLicenseRequestDto,
    }),
    (0, common_1.Post)('/mobile/submit-replacement-request'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [license_dto_1.MobileReplaceLicenseRequestDto, Object]),
    __metadata("design:returntype", Promise)
], LicenseController.prototype, "mobileSubmitReplacementRequest", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Submit pre-registration files (biometrics) to license applications',
    }),
    (0, swagger_1.ApiBody)({
        type: license_dto_1.AttachFilesDto,
    }),
    (0, common_1.Post)('/submit-pre-registration-files'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [license_dto_1.AttachFilesDto]),
    __metadata("design:returntype", Promise)
], LicenseController.prototype, "submitPreRegistrationFiles", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Approve license',
    }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, roles_1.AllowedRoles)(roles_1.Role.Admin, roles_1.Role.MVAA_ADMIN),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Post)('/approve'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [license_dto_1.ApproveLicenseDto, Object]),
    __metadata("design:returntype", Promise)
], LicenseController.prototype, "approveLicense", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Update license details',
    }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, roles_1.AllowedRoles)(roles_1.Role.Admin, roles_1.Role.MVAA_ADMIN),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Post)('/update'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [license_dto_1.UpdateLicenseDto]),
    __metadata("design:returntype", Promise)
], LicenseController.prototype, "updateLicense", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Expire License [TEST]',
    }),
    (0, common_1.Post)('/expire'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [license_dto_1.ExpireLicenseDto]),
    __metadata("design:returntype", Promise)
], LicenseController.prototype, "expireLicense", null);
exports.LicenseController = LicenseController = __decorate([
    (0, common_1.Controller)('license'),
    __metadata("design:paramtypes", [license_service_1.LicenseService])
], LicenseController);
//# sourceMappingURL=license.controller.js.map