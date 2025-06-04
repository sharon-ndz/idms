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
exports.PaymentController = void 0;
const common_1 = require("@nestjs/common");
const payment_service_1 = require("./payment.service");
const payment_dto_1 = require("./payment.dto");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../../guards/jwt-auth.guard");
const roles_1 = require("../../middlewares/roles");
const license_dto_1 = require("../license/license.dto");
const enums_1 = require("../../core/constants/enums");
let PaymentController = class PaymentController {
    constructor(service) {
        this.service = service;
    }
    settingsList(data) {
        return this.service.settingsList(data);
    }
    createPaymentSetting(data) {
        return this.service.createPaymentSetting(data);
    }
    updatePaymentSetting(data) {
        return this.service.updatePaymentSetting(data);
    }
    getRevenueSummary() {
        return this.service.getRevenueSummary();
    }
    getMonthlyRevenueVolume(data) {
        return this.service.getMonthlyRevenueVolume(data);
    }
    getTotalRevenueGroupedByService(startDate, endDate) {
        return this.service.getTotalRevenueGroupedByService(new Date(startDate), new Date(endDate));
    }
    getTopRevenueByLga(startDate, endDate) {
        return this.service.getTopRevenueByLga(new Date(startDate), new Date(endDate));
    }
    async paystackCallback(data, res) {
        const paymentResp = await this.service.verify({
            reference: data.reference,
        });
        return res.redirect(paymentResp.paymentData && paymentResp.paymentData.status === enums_1.PaymentStatus.Completed
            ? paymentResp.paymentData.successRedirectUrl +
                '&reference=' +
                paymentResp.paymentData.reference
            : paymentResp.paymentData.failureRedirectUrl);
    }
    async initiate(type, req) {
        return await this.service.initiate(type, req);
    }
    async verify(data) {
        return await this.service.verify(data);
    }
    async validateTransaction(data) {
        return await this.service.validateTransaction(data);
    }
    getRevenueStats() {
        return this.service.getRevenueStats();
    }
    async listTransactionLogs(data, req) {
        return await this.service.listTransactionLogs(data, req.user);
    }
    async updatePayment(data) {
        return await this.service.updatePayment(data);
    }
};
exports.PaymentController = PaymentController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Fetches list of payment settings' }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, roles_1.AllowedRoles)(roles_1.Role.Admin),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Get)('/settings/list'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [payment_dto_1.PaymentSettingsListRequestsDto]),
    __metadata("design:returntype", void 0)
], PaymentController.prototype, "settingsList", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Create payment setting' }),
    (0, swagger_1.ApiBody)({ type: payment_dto_1.PaymentSettingsDto }),
    (0, swagger_1.ApiResponse)({ status: 200, type: payment_dto_1.PaymentSettingsDto }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, roles_1.AllowedRoles)(roles_1.Role.Admin),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Post)('/settings/create'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [payment_dto_1.PaymentSettingsDto]),
    __metadata("design:returntype", Promise)
], PaymentController.prototype, "createPaymentSetting", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Update payment setting' }),
    (0, swagger_1.ApiBody)({ type: payment_dto_1.UpdatePaymentSettingsDto }),
    (0, swagger_1.ApiResponse)({ status: 200, type: payment_dto_1.UpdatePaymentSettingsDto }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, roles_1.AllowedRoles)(roles_1.Role.Admin),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Post)('/settings/update'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [payment_dto_1.UpdatePaymentSettingsDto]),
    __metadata("design:returntype", Promise)
], PaymentController.prototype, "updatePaymentSetting", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Calculates the total revenue for new, renewal, and replacement licenses',
    }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, roles_1.AllowedRoles)(roles_1.Role.Admin),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Get)('/revenue/summary'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PaymentController.prototype, "getRevenueSummary", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Calculates the total revenue per month',
    }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, roles_1.AllowedRoles)(roles_1.Role.Admin),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Get)('/revenue/monthly-volume'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [license_dto_1.LicenseStatsWithYearDto]),
    __metadata("design:returntype", void 0)
], PaymentController.prototype, "getMonthlyRevenueVolume", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Calculates the total revenue for each service type (new, renewal, replacement) within a date range',
    }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, roles_1.AllowedRoles)(roles_1.Role.Admin),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Get)('/revenue/by-service'),
    __param(0, (0, common_1.Query)('startDate')),
    __param(1, (0, common_1.Query)('endDate')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], PaymentController.prototype, "getTotalRevenueGroupedByService", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Fetches the top 5 LGAs by total revenue within a date range',
    }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, roles_1.AllowedRoles)(roles_1.Role.Admin),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Get)('/revenue/top-by-lga'),
    __param(0, (0, common_1.Query)('startDate')),
    __param(1, (0, common_1.Query)('endDate')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], PaymentController.prototype, "getTopRevenueByLga", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Paystack callback' }),
    (0, common_1.Get)('/paystack-callback'),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [payment_dto_1.ReferenceDto, Object]),
    __metadata("design:returntype", Promise)
], PaymentController.prototype, "paystackCallback", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Initialize payment with auto detect feature',
    }),
    (0, common_1.Post)('/initiate'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [payment_dto_1.PaymentDto, Object]),
    __metadata("design:returntype", Promise)
], PaymentController.prototype, "initiate", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'verify payment after client has been redirected. This sets the payment to completed if successfully verified.',
    }),
    (0, common_1.Post)('/verify'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [payment_dto_1.ValidateTransactionDto]),
    __metadata("design:returntype", Promise)
], PaymentController.prototype, "verify", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Validate the status of a transaction',
    }),
    (0, common_1.Post)('/validate-transaction'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [payment_dto_1.ValidateTransactionDto]),
    __metadata("design:returntype", Promise)
], PaymentController.prototype, "validateTransaction", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Calculates the total revenue for students registration, applications and inspection fees (LASDRI ADMIN)',
    }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, roles_1.AllowedRoles)(roles_1.Role.LASDRI_ADMIN),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Get)('/revenue/lasdri-stats'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PaymentController.prototype, "getRevenueStats", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'List transaction logs (LASDRI_ADMIN)',
    }),
    (0, swagger_1.ApiResponse)({ status: 200, type: payment_dto_1.TransactionResponseDto }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, roles_1.AllowedRoles)(roles_1.Role.LASDRI_ADMIN),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Get)('/transaction-logs'),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [payment_dto_1.ListTransactionLogDto, Object]),
    __metadata("design:returntype", Promise)
], PaymentController.prototype, "listTransactionLogs", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Update payment [TEST]',
    }),
    (0, common_1.Post)('/update'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [payment_dto_1.UpdatePaymentDto]),
    __metadata("design:returntype", Promise)
], PaymentController.prototype, "updatePayment", null);
exports.PaymentController = PaymentController = __decorate([
    (0, common_1.Controller)('payments'),
    __metadata("design:paramtypes", [payment_service_1.PaymentService])
], PaymentController);
//# sourceMappingURL=payment.controller.js.map