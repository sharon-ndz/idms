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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const auth_dto_1 = require("./auth.dto");
const swagger_1 = require("@nestjs/swagger");
const test_nin_entity_1 = require("../../entities/test-nin.entity");
const jwt_auth_guard_1 = require("../../guards/jwt-auth.guard");
let AuthController = class AuthController {
    constructor(service) {
        this.service = service;
    }
    async login(data) {
        return this.service.login(data);
    }
    async sendOtp(data) {
        return await this.service.sendOtp(data);
    }
    async validateOtp(data) {
        return await this.service.validateOtp(data);
    }
    async resendOtp(data) {
        return await this.service.resendOtp(data);
    }
    async changePassword(resetPasswordDto) {
        return await this.service.resetPassword(resetPasswordDto);
    }
    async logout(req) {
        return this.service.logout(req.user);
    }
    async addTestNIN({ nin, data }) {
        return await this.service.addTestNin(nin, data);
    }
    async verifyNIN(nin) {
        return await this.service.verifyNIN(nin);
    }
    async updatePassword(req, updatePasswordDto) {
        return await this.service.updatePassword(req.user, updatePasswordDto);
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Login a user and return access token',
    }),
    (0, swagger_1.ApiBody)({ type: auth_dto_1.AuthUserDto }),
    (0, common_1.Post)('/login'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_dto_1.AuthUserDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Send OTP to supplied email or phone',
    }),
    (0, swagger_1.ApiBody)({ type: auth_dto_1.SendOTPDataDto }),
    (0, common_1.Post)('/send-otp'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_dto_1.SendOTPDataDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "sendOtp", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Validate OTP sent to supplied email or phone',
    }),
    (0, swagger_1.ApiBody)({ type: auth_dto_1.OTPDataDto }),
    (0, common_1.Post)('/validate-otp'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_dto_1.OTPDataDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "validateOtp", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Resend OTP to supplied email or phone',
    }),
    (0, swagger_1.ApiBody)({ type: auth_dto_1.SendOTPDataDto }),
    (0, common_1.Post)('/resend-otp'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_dto_1.SendOTPDataDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "resendOtp", null);
__decorate([
    (0, swagger_1.ApiOperation)({ description: 'Reset password.' }),
    (0, common_1.Post)('/reset-password'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_dto_1.ResetPasswordDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "changePassword", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Logout a user' }),
    (0, common_1.Post)('/logout'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "logout", null);
__decorate([
    (0, swagger_1.ApiOperation)({ description: 'Upload test nin' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: test_nin_entity_1.TestNin }),
    (0, common_1.Post)('/test-nin'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_dto_1.TestNinRequestDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "addTestNIN", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'verify NIN and return nin data' }),
    (0, common_1.Get)('/verify-nin/:nin'),
    __param(0, (0, common_1.Param)('nin')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "verifyNIN", null);
__decorate([
    (0, swagger_1.ApiOperation)({ description: 'Update user password' }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Post)('/update-password'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, auth_dto_1.UpdatePasswordRequestDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "updatePassword", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map