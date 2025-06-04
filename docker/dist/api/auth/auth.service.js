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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("../users/users.service");
const jwt_1 = require("@nestjs/jwt");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const otp_entity_1 = require("../../entities/otp.entity");
const nin_1 = __importDefault(require("../../core/nin"));
const general_1 = require("../../core/helpers/general");
const email_notification_entity_1 = require("../../entities/email-notification.entity");
const test_nin_entity_1 = require("../../entities/test-nin.entity");
const user_entity_1 = require("../../entities/user.entity");
const class_transformer_1 = require("class-transformer");
const file_service_1 = require("../file/file.service");
const roles_1 = require("../../middlewares/roles");
const node_entity_1 = require("../../entities/node.entity");
const messages_1 = require("../../core/constants/messages");
const enums_1 = require("../../core/constants/enums");
const helpers_1 = require("../../core/helpers");
const functions_helpers_1 = require("../../core/helpers/functions.helpers");
let AuthService = class AuthService {
    constructor(usersService, jwtService, fileService, otpRepository, testNinRepository, nodeRepository, emailNotificationRepository) {
        this.usersService = usersService;
        this.jwtService = jwtService;
        this.fileService = fileService;
        this.otpRepository = otpRepository;
        this.testNinRepository = testNinRepository;
        this.nodeRepository = nodeRepository;
        this.emailNotificationRepository = emailNotificationRepository;
    }
    async login(data) {
        const user = await this.usersService.findUserBy({ email: data.email });
        const nodeLimit = 3;
        let node;
        if (!user || !(await user_entity_1.User.comparePasswords(data.password, user.password))) {
            throw new common_1.BadRequestException('Invalid credentials');
        }
        if (user.isActive === enums_1.Status.Inactive) {
            throw new common_1.BadRequestException('Account suspended!');
        }
        if (user.lastPasswordChange &&
            (0, functions_helpers_1.getDateDiff)(user.lastPasswordChange, new Date()) >= 60) {
            user.changePasswordNextLogin = enums_1.ChangePasswordNextLogin.True;
        }
        if (user.roleId === roles_1.Role.MVAA || user.roleId === roles_1.Role.DVIS || user.roleId === roles_1.Role.LASDRI) {
            node = await this.nodeRepository.findOne({
                where: { deviceId: data.deviceId },
            });
            if (!node) {
                throw new common_1.BadRequestException('Pre activation request node not found');
            }
            if (user.node && user.node.deviceId !== data.deviceId) {
                throw new common_1.BadRequestException('User not linked on device.');
            }
            else {
                await this.usersService.updateNode(user.id, node.id);
            }
        }
        const { password: _, ...rest } = user;
        const payload = { ...rest, node: node ? node.id : null };
        const accessToken = this.jwtService.sign(payload);
        const expiry = this.jwtService.decode(accessToken, { complete: true }).payload.exp;
        const result = {
            success: true,
            message: messages_1.MESSAGES.welcome,
            user: (0, class_transformer_1.plainToInstance)(user_entity_1.User, payload),
            accessToken: accessToken,
            expires: new Date(expiry * 1000).toISOString(),
            biometric: null,
        };
        if (data.fingerType) {
            result.biometric = await this.getFileByFingerType(data.fingerType, user);
            result.deviceOnboarded = true;
        }
        return result;
    }
    async resetPassword(data) {
        const response = { success: false, message: '' };
        try {
            const whereConditions = this.getWhereClause(data);
            if (Object.values(whereConditions).length === 0) {
                throw new common_1.BadRequestException('Either email or phone number is required');
            }
            const validateResp = await this.validateOtp({
                otp: data.otp,
                phone: data.phone,
                email: data.email,
                deleteOTP: true,
            });
            if (!validateResp.success) {
                throw new common_1.NotFoundException('Invalid OTP or has already been used');
            }
            const user = await this.usersService.findUserBy(whereConditions);
            user.password = data.password;
            await user.hashPassword();
            await this.usersService.update(user.id, user);
            response.success = true;
            response.message = 'Password reset successfully!';
        }
        catch (error) {
            console.log(error);
            response.message = error.message;
        }
        return response;
    }
    async updatePassword(user, data) {
        const response = { success: false, message: '' };
        data.userId = user.id;
        try {
            if (data.password !== data.confirmPassword) {
                throw new common_1.BadRequestException(messages_1.MESSAGES.passwordMismatch);
            }
            const userRecord = await this.usersService.findUserBy({ id: data.userId });
            if (!userRecord || !(await user_entity_1.User.comparePasswords(data.oldPassword, userRecord.password))) {
                throw new common_1.BadRequestException('Invalid credentials');
            }
            if (await user_entity_1.User.comparePasswords(data.password, userRecord.password)) {
                throw new common_1.BadRequestException(messages_1.MESSAGES.oldNewPasswordMatch);
            }
            userRecord.password = data.password;
            await userRecord.hashPassword();
            await this.usersService.update(user.id, userRecord);
            response.success = true;
            response.message = 'Password updated successfully!';
        }
        catch (error) {
            console.log(error);
            response.message = error.message;
        }
        return response;
    }
    async sendOtp(data) {
        const response = { success: false, message: '' };
        try {
            const otp = (0, functions_helpers_1.numberCode)(6);
            const params = this.getWhereClause(data);
            if (Object.values(params).length === 0) {
                throw new common_1.BadRequestException('Either email or phone number is required');
            }
            params.otp = otp;
            await this.otpRepository.insert(params);
            if (params.email) {
                await helpers_1.mailer
                    .setSubject(messages_1.MESSAGES.otpEmailSubject)
                    .setMessage(messages_1.MESSAGES.otpEmailBody(otp))
                    .setTo(params.email)
                    .setEmailNotificationRepository(this.emailNotificationRepository)
                    .sendDefault();
            }
            response.success = true;
            response.message = messages_1.MESSAGES.otpSent;
        }
        catch (error) {
            console.log(error);
            response.message = error.message;
        }
        return response;
    }
    async validateOtp(data) {
        const response = { success: false, message: '' };
        try {
            const whereConditions = this.getWhereClause(data);
            if (Object.values(whereConditions).length === 0) {
                throw new common_1.BadRequestException('Either email or phone number is required');
            }
            whereConditions.otp = data.otp;
            const result = await this.otpRepository.findOne({
                where: whereConditions,
            });
            if (!result || result.isUsed || result.otp !== data.otp) {
                throw new common_1.NotFoundException('Invalid OTP or has already been used');
            }
            if (!(0, general_1.isOTPValid)(result.issuedAt)) {
                throw new common_1.NotAcceptableException('OTP has expired');
            }
            if (data.deleteOTP) {
                await this.otpRepository.delete({ id: result.id });
            }
            response.success = true;
            response.message = messages_1.MESSAGES.otpValid;
        }
        catch (error) {
            console.log(error);
            response.message = error.message;
        }
        return response;
    }
    async resendOtp(data) {
        const response = { success: false, message: '' };
        try {
            const params = this.getWhereClause(data);
            if (Object.values(params).length === 0) {
                throw new common_1.BadRequestException('Either email or phone number is required');
            }
            const existingOtps = await this.otpRepository.find({
                where: params,
                order: {
                    createdAt: 'DESC',
                },
            });
            const existingOtp = existingOtps[0];
            if (!existingOtp || existingOtp.isUsed) {
                return await this.sendOtp(params);
            }
            const dbTimezoneOffset = existingOtp.issuedAt.getTimezoneOffset();
            const newIssuedAt = new Date(Date.now() + dbTimezoneOffset);
            if (params.email) {
                await helpers_1.mailer
                    .setSubject(messages_1.MESSAGES.otpEmailSubject)
                    .setMessage(messages_1.MESSAGES.otpEmailBody(existingOtp.otp))
                    .setTo(params.email)
                    .setEmailNotificationRepository(this.emailNotificationRepository)
                    .sendDefault();
            }
            await this.otpRepository.update({ id: existingOtp.id }, { issuedAt: newIssuedAt });
            response.success = true;
            response.message = messages_1.MESSAGES.otpSent;
        }
        catch (error) {
            console.log(error);
            response.message = error.message;
        }
        return response;
    }
    async deleteOtp(otp) {
        await this.otpRepository.delete({ otp: otp });
    }
    async logout(user) {
        const userRecord = await this.usersService.findUserBy({ id: user.id });
        if (!userRecord) {
            throw new common_1.NotFoundException('No user found');
        }
        return {
            success: true,
            message: messages_1.MESSAGES.logout,
        };
    }
    async addTestNin(nin, data) {
        try {
            const record = await this.testNinRepository.findOne({ where: { nin: nin } });
            if (record) {
                record.data = data;
                await this.testNinRepository.update({ id: record.id }, record);
            }
            else {
                await this.testNinRepository.insert({ nin: nin, data: data });
            }
            return { message: 'Test NIN insert/update successful' };
        }
        catch (e) {
            console.log(e);
            throw new common_1.InternalServerErrorException('Unable to add test nin');
        }
    }
    async verifyNIN(nin) {
        const response = { success: false, message: 'Query ok', data: null };
        try {
            if (process.env.NODE_ENV !== 'production') {
                const ninData = await this.testNinRepository.findOne({ where: { nin } });
                if (!ninData) {
                    throw new common_1.BadRequestException(messages_1.MESSAGES.invalidNin);
                }
                response.success = true;
                response.data = ninData.data;
                return response;
            }
            const ninData = await nin_1.default.verifyNIN(nin);
            if ((0, general_1.isNINValid)(ninData)) {
                response.data = ninData;
                response.success = true;
            }
            else {
                response.message =
                    'Some demographic information or the picture is missing. Please contact NIMC for more information.';
            }
        }
        catch (error) {
            console.log(error);
            response.message = error.message;
        }
        return response;
    }
    getWhereClause(data) {
        const whereConditions = {};
        if (data.email && data.email.length > 0) {
            whereConditions.email = data.email;
        }
        else if (data.phone && data.phone.length > 0) {
            whereConditions.phone = data.phone;
        }
        return whereConditions;
    }
    async getFileByFingerType(fingerType, user) {
        if (user.files && Array.isArray(user.files)) {
            for (const file of user.files) {
                if (file && file.fingerType === fingerType) {
                    const base64 = await this.fileService.getFileById(file.fileId);
                    if (!base64) {
                        return null;
                    }
                    return base64;
                }
            }
        }
        return null;
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(3, (0, typeorm_1.InjectRepository)(otp_entity_1.Otp)),
    __param(4, (0, typeorm_1.InjectRepository)(test_nin_entity_1.TestNin)),
    __param(5, (0, typeorm_1.InjectRepository)(node_entity_1.Node)),
    __param(6, (0, typeorm_1.InjectRepository)(email_notification_entity_1.EmailNotification)),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        jwt_1.JwtService,
        file_service_1.FileService,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], AuthService);
//# sourceMappingURL=auth.service.js.map