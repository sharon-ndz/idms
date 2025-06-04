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
exports.PaymentService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const payment_entity_1 = require("../../entities/payment.entity");
const payment_data_1 = require("./payment.data");
const enums_1 = require("../../core/constants/enums");
const qs_1 = __importDefault(require("qs"));
const axios_1 = __importDefault(require("axios"));
const email_notification_entity_1 = require("../../entities/email-notification.entity");
const license_entity_1 = require("../../entities/license.entity");
const pre_registration_entity_1 = require("../../entities/pre-registration.entity");
const general_1 = require("../../core/helpers/general");
const payment_setting_entity_1 = require("../../entities/payment-setting.entity");
const messages_1 = require("../../core/constants/messages");
const constants_1 = require("../../core/constants/constants");
const helpers_1 = require("../../core/helpers");
const functions_helpers_1 = require("../../core/helpers/functions.helpers");
const all_dto_1 = require("../../core/interfaces/all.dto");
const class_transformer_1 = require("class-transformer");
let PaymentService = class PaymentService {
    constructor(paymentRepository, paymentSettingRepository, licenseRepository, emailNotificationRepository, preRegistrationRepository, dataSource) {
        this.paymentRepository = paymentRepository;
        this.paymentSettingRepository = paymentSettingRepository;
        this.licenseRepository = licenseRepository;
        this.emailNotificationRepository = emailNotificationRepository;
        this.preRegistrationRepository = preRegistrationRepository;
        this.dataSource = dataSource;
    }
    async settingsList(data) {
        const response = { success: false, message: '', data: null };
        const search = data.search || null;
        const limit = Number(data.resultPerPage || 10);
        const page = Number(data.page || 1);
        const offset = (page - 1) * limit;
        try {
            const queryBuilder = this.paymentSettingRepository.createQueryBuilder('paymentSettings');
            if (data.name) {
                queryBuilder.andWhere('paymentSettings.name = :name', { name: data.name });
            }
            if (data.status) {
                queryBuilder.andWhere(`paymentSettings.status = :status`, {
                    status: data.status,
                });
            }
            if (search) {
                queryBuilder.andWhere(new typeorm_2.Brackets((qb) => {
                    qb.where('paymentSettings.name LIKE :name', { name: `%${search}%` })
                        .orWhere('paymentSettings.type LIKE :type', { type: `%${search}%` });
                }));
            }
            const [result, count] = await queryBuilder.getManyAndCount();
            if (result) {
                response.data = {
                    result,
                    pagination: (0, functions_helpers_1.getPagination)(count, page, offset, limit),
                };
            }
            response.success = true;
            response.message = messages_1.MESSAGES.recordFound;
        }
        catch (error) {
            console.log(error);
            response.message = error.message;
        }
        return response;
    }
    async createPaymentSetting(data) {
        const response = { success: false, message: '', data: null };
        const queryRunner = await (0, all_dto_1.beginTransaction)(this.dataSource);
        try {
            const setting = await queryRunner.manager.findOne(payment_setting_entity_1.PaymentSetting, {
                where: { type: data.type },
            });
            if (setting) {
                throw new common_1.BadRequestException('Payment setting with type already exists!');
            }
            const payload = (0, class_transformer_1.plainToInstance)(payment_setting_entity_1.PaymentSetting, data);
            await queryRunner.manager.save(payment_setting_entity_1.PaymentSetting, payload);
            await queryRunner.commitTransaction();
            response.data = payload;
            response.success = true;
            response.message = messages_1.MESSAGES.recordAdded;
        }
        catch (error) {
            await queryRunner.rollbackTransaction();
            console.log(error);
            response.message = error.message;
        }
        finally {
            await queryRunner.release();
        }
        return response;
    }
    async updatePaymentSetting(data) {
        const response = { success: false, message: '', data: null };
        const queryRunner = await (0, all_dto_1.beginTransaction)(this.dataSource);
        try {
            const existingSetting = await queryRunner.manager.findOneBy(payment_setting_entity_1.PaymentSetting, { id: data.id });
            if (!existingSetting) {
                throw new common_1.NotFoundException(`Payment setting not found`);
            }
            if (data.type && data.type !== existingSetting.type) {
                const existingTypeSetting = await queryRunner.manager.findOneBy(payment_setting_entity_1.PaymentSetting, {
                    type: data.type,
                });
                if (existingTypeSetting) {
                    throw new common_1.BadRequestException(`Payment type already exists`);
                }
            }
            const updatedSetting = { ...existingSetting, ...data };
            const payload = (0, class_transformer_1.plainToInstance)(payment_setting_entity_1.PaymentSetting, updatedSetting);
            await queryRunner.manager.save(payment_setting_entity_1.PaymentSetting, payload);
            await queryRunner.commitTransaction();
            response.data = payload;
            response.success = true;
            response.message = messages_1.MESSAGES.recordAdded;
        }
        catch (error) {
            await queryRunner.rollbackTransaction();
            console.log(error);
            response.message = error.message;
        }
        finally {
            await queryRunner.release();
        }
        return response;
    }
    async initiate(paymentObject, request) {
        const response = { success: false, message: '', data: null };
        try {
            let isNigeriaIp = request.location && request.location.countryLong.toLocaleLowerCase() === 'nigeria';
            if (typeof request.location === 'undefined') {
                isNigeriaIp = true;
            }
            const currency = isNigeriaIp ? enums_1.Currency.NGN : enums_1.Currency.USD;
            const setting = await this.paymentSettingRepository.findOne({
                where: {
                    currency,
                    type: paymentObject.type,
                    drivingSchoolId: paymentObject.drivingSchoolId,
                    status: enums_1.Status.Active,
                },
            });
            if (!setting) {
                throw new common_1.NotFoundException('Payment setting for this payment does not exist');
            }
            const details = payment_data_1.PaymentData.getDetails(setting);
            if (isNigeriaIp) {
                return this.initiatePaystackPayment(paymentObject, details);
            }
            return this.initiateFCMBPayment(paymentObject, details);
        }
        catch (error) {
            console.error(error);
            response.message = error.message;
        }
        return response;
    }
    async verify(data) {
        let verificationResp;
        const response = {
            success: false,
            message: 'Payment failed',
            status: enums_1.PaymentStatus.Failed,
            paymentData: null,
        };
        try {
            const payment = await this.paymentRepository.findOne({
                where: {
                    reference: data.reference,
                    refunded: false,
                },
            });
            if (!payment || payment.status === enums_1.PaymentStatus.Used) {
                throw new common_1.NotFoundException('Payment reference not found or has been used');
            }
            if (payment.provider === enums_1.PaymentGateway.PAYSTACK) {
                verificationResp = await this.verifyPaystackPayment(data);
            }
            else {
                verificationResp = await this.verifyFCMBPayment(data, payment);
            }
            const transactionLog = JSON.parse(payment.log);
            if (payment.status === enums_1.PaymentStatus.Pending) {
                let log = {
                    session: payment.id,
                    email: transactionLog.email,
                };
                if (verificationResp.log) {
                    log = {
                        ...log,
                        ...verificationResp.log,
                    };
                }
                payment.log = JSON.stringify(log);
                if (verificationResp.status === 'success') {
                    switch (payment.type) {
                        case enums_1.TransactionType.preRegistration:
                            await this.verifyPreRegistration(payment);
                            break;
                        case enums_1.TransactionType.licenseRenewal:
                        case enums_1.TransactionType.licenseReplacement:
                            await this.verifyLicense(payment);
                            break;
                    }
                    response.message = 'Payment completed successfully';
                    payment.status = enums_1.PaymentStatus.Completed;
                }
                else {
                    payment.status = enums_1.PaymentStatus.Failed;
                }
                await this.paymentRepository.save(payment);
            }
            response.success = true;
            response.status = Object.values(enums_1.PaymentStatus)[payment.status];
            response.paymentData = payment;
        }
        catch (error) {
            response.success = false;
            response.message = error.message;
        }
        return response;
    }
    async updatePayment(data) {
        const response = { success: false, message: '', data: null };
        try {
            const payment = await this.findPaymentBy({ reference: data.reference });
            if (!payment) {
                throw new common_1.NotFoundException(messages_1.MESSAGES.recordNotFound);
            }
            await this.paymentRepository.update({ id: payment.id }, data);
            response.data = data;
            response.message = messages_1.MESSAGES.recordUpdated;
        }
        catch (error) {
            console.error(error);
            response.message = error.message;
        }
        return response;
    }
    async validateTransaction(data) {
        const payment = await this.paymentRepository.findOne({
            where: {
                reference: data.reference,
                type: data.type,
                refunded: false,
            },
        });
        if (!payment) {
            throw new common_1.NotFoundException('Payment reference not found or has been used');
        }
        return {
            success: true,
            status: payment.status,
            type: payment.type,
            message: 'Query ok',
            reference: data.reference,
        };
    }
    async initiateFCMBPayment(paymentObject, details) {
        let session = {};
        const userId = 0;
        paymentObject.currency = details.currency;
        paymentObject.amount = details.amount == 0 ? paymentObject.amount : details.amount;
        try {
            const insertResult = await this.paymentRepository.insert({
                reference: details.reference,
                status: enums_1.PaymentStatus.Pending,
                currency: paymentObject.currency,
                type: paymentObject.type,
                email: paymentObject.email,
                amount: details.amount,
                charges: details.charges,
                itemType: paymentObject.type,
                provider: enums_1.PaymentGateway.FCMB,
                successRedirectUrl: paymentObject.successRedirectUrl,
                failureRedirectUrl: paymentObject.failureRedirectUrl,
                itemId: 0,
                userId: userId,
                log: JSON.stringify({}),
                createdAt: new Date(),
            });
            const transactionDetails = insertResult.raw[0];
            paymentObject.orderId = transactionDetails.id;
            const data = qs_1.default.stringify({
                apiOperation: constants_1.FCMBPayment.apiOperation,
                apiUsername: constants_1.FCMBPayment.username,
                apiPassword: constants_1.FCMBPayment.secret,
                merchant: constants_1.FCMBPayment.merchant,
                'interaction.operation': constants_1.FCMBPayment.interactionOperation,
                'interaction.merchant.name': constants_1.FCMBPayment.merchantName,
                'order.id': paymentObject.orderId,
                'order.amount': details.amountToPay,
                'order.currency': paymentObject.currency,
                'order.description': paymentObject.description,
                'order.reference': details.reference,
                'transaction.reference': details.reference,
            });
            const config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: constants_1.FCMBPayment.url,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                data: data,
            };
            const response = await axios_1.default.request(config);
            session = payment_data_1.PaymentData.formatFCMBResponse(response.data);
            const transactionLog = JSON.stringify({
                session: session,
                email: paymentObject.email,
                'order.id': paymentObject.orderId,
                'order.amount': details.amount,
                'order.amountToPay': details.amountToPay,
                'order.currency': paymentObject.currency,
                'order.description': paymentObject.description,
                'order.reference': details.reference,
            });
            await this.paymentRepository.update(transactionDetails.id, {
                log: transactionLog,
            });
            if (session.result === 'SUCCESS') {
                if (!transactionDetails) {
                    throw new common_1.InternalServerErrorException(`error initializing payment`);
                }
            }
        }
        catch (error) {
            console.log(error);
            throw new common_1.InternalServerErrorException(`error initializing payment: ${error}`);
        }
        delete session.successIndicator;
        delete session.checkoutMode;
        delete session.merchant;
        return {
            gateway: enums_1.PaymentGateway.FCMB,
            ...session,
            reference: details.reference,
        };
    }
    async initiatePaystackPayment(paymentObject, details) {
        paymentObject.redirectUrl = `${process.env.API_HOSTNAME}/payments/paystack-callback`;
        const userId = 0;
        const invoice = helpers_1.paystack
            .setAuthorization(constants_1.appConstants.paymentKey)
            .setCustomer(paymentObject.email)
            .setReferenceNumber(details.reference)
            .setCurrency(details.currency)
            .setCallbackUrl(paymentObject.redirectUrl)
            .setTransactionAmount(details.amountToPay);
        const payment = await invoice.initialize();
        if (payment.success === false) {
            throw new common_1.GatewayTimeoutException(payment.message);
        }
        paymentObject.amount = details.amountToPay;
        paymentObject.currency = details.currency;
        try {
            await this.paymentRepository.insert({
                reference: details.reference,
                status: enums_1.PaymentStatus.Pending,
                currency: paymentObject.currency,
                type: paymentObject.type,
                amount: details.amount,
                charges: details.charges,
                email: paymentObject.email,
                itemType: paymentObject.type,
                provider: enums_1.PaymentGateway.PAYSTACK,
                successRedirectUrl: paymentObject.successRedirectUrl,
                failureRedirectUrl: paymentObject.failureRedirectUrl,
                itemId: 0,
                log: JSON.stringify({ email: paymentObject.email }),
                userId: userId,
            });
        }
        catch (error) {
            console.log(error);
            throw new common_1.InternalServerErrorException(`error initializing payment: ${error}`);
        }
        return {
            gateway: enums_1.PaymentGateway.PAYSTACK,
            success: payment.success,
            url: payment.link,
            reference: details.reference,
        };
    }
    async verifyPaystackPayment(data) {
        const response = {
            success: false,
            status: 'failed',
            message: 'Payment verification failed',
            log: null,
        };
        try {
            const receipt = helpers_1.paystack
                .setReferenceNumber(data.reference)
                .setAuthorization(constants_1.appConstants.paymentKey);
            const { data: responseData } = await receipt.verify();
            response.log = responseData;
            response.success = true;
            response.status = responseData.status;
            response.message = 'Payment verification successful';
        }
        catch (error) {
            console.log(error);
            response.success = false;
            response.message = 'Payment verification failed';
        }
        return response;
    }
    async verifyFCMBPayment(data, transaction) {
        const response = {
            success: false,
            status: 'failed',
            message: 'Payment verification failed',
            log: null,
        };
        try {
            const transactionLog = JSON.parse(transaction.log);
            if (transactionLog.session.successIndicator == data.successIndicator) {
                response.log = transactionLog.session;
                response.success = true;
                response.status = 'success';
                response.message = 'Payment verification successful';
            }
        }
        catch (error) {
            console.log(error);
            response.success = false;
            response.message = error.message;
        }
        return response;
    }
    async getRevenueSummary() {
        const result = await this.licenseRepository
            .createQueryBuilder('licenses')
            .leftJoinAndSelect('licenses.transaction', 'transactions')
            .select([
            "SUM(CASE WHEN licenses.requestType = 'new' THEN transactions.amount ELSE 0 END) AS newRevenue",
            "SUM(CASE WHEN licenses.requestType = 'renewal' THEN transactions.amount ELSE 0 END) AS renewalRevenue",
            "SUM(CASE WHEN licenses.requestType = 'replacement' THEN transactions.amount ELSE 0 END) AS replacementRevenue",
        ])
            .getRawOne();
        return {
            newRevenue: parseFloat(result.newrevenue) || 0,
            renewalRevenue: parseFloat(result.renewalrevenue) || 0,
            replacementRevenue: parseFloat(result.replacementrevenue) || 0,
        };
    }
    async getMonthlyRevenueVolume(data) {
        let year = new Date().getFullYear();
        if (data.year) {
            year = new Date(new Date().setFullYear(+data.year)).getFullYear();
        }
        const qb = this.licenseRepository
            .createQueryBuilder('licenses')
            .leftJoinAndSelect('licenses.transaction', 'transactions');
        qb.select([
            'EXTRACT(MONTH FROM licenses.createdAt) AS month',
            'SUM(transactions.amount) AS totalRevenue',
        ])
            .where(`EXTRACT(YEAR FROM licenses.createdAt) = :year`, { year })
            .groupBy('month')
            .orderBy('month');
        if (data.status) {
            if (data.status === 'expired') {
                qb.andWhere('licenses.expiryAt < NOW()');
            }
            else {
                qb.andWhere(`licenses.status = :status`, { status: data.status });
            }
        }
        if (data.type !== 'all') {
            qb.andWhere(`licenses.requestType = :type`, { type: data.type });
        }
        return qb.getRawMany();
    }
    async getTotalRevenueGroupedByService(startDate, endDate) {
        return this.licenseRepository
            .createQueryBuilder('licenses')
            .leftJoinAndSelect('licenses.transaction', 'transactions')
            .select(['licenses.requestType AS service', 'SUM(transactions.amount) AS totalRevenue'])
            .where('licenses.createdAt BETWEEN :startDate AND :endDate', { startDate, endDate })
            .groupBy('licenses.requestType')
            .getRawMany();
    }
    async getTopRevenueByLga(startDate, endDate) {
        return this.licenseRepository
            .createQueryBuilder('licenses')
            .leftJoinAndSelect('licenses.transaction', 'transactions')
            .select(['licenses.lgaId AS lgaId', 'SUM(transactions.amount) AS totalRevenue'])
            .where('licenses.created_at BETWEEN :startDate AND :endDate', { startDate, endDate })
            .groupBy('licenses.lgaId')
            .orderBy('totalRevenue', 'DESC')
            .limit(5)
            .getRawMany();
    }
    async update(id, payment) {
        await this.paymentRepository.update(id, payment);
    }
    async findPaymentBy(where) {
        return await this.paymentRepository.findOneBy(where);
    }
    async verifyPreRegistration(data) {
        if (data.reference) {
            const payment = await this.findPaymentBy({ reference: data.reference });
            if (payment && payment.status === enums_1.PaymentStatus.Pending) {
                const preRegistration = await this.preRegistrationRepository.findOne({
                    where: { reference: payment.reference },
                    relations: ['student.application'],
                });
                if (preRegistration && preRegistration.status === enums_1.PreRegistrationStatus.Pending) {
                    preRegistration.applicationNo = (0, general_1.generatePreRegApplicationNo)(preRegistration.student);
                    preRegistration.status = enums_1.PreRegistrationStatus.Processing;
                    await this.preRegistrationRepository.update({ id: preRegistration.id }, preRegistration);
                    payment.used = enums_1.Reference.Used;
                    payment.status = enums_1.PaymentStatus.Used;
                    await this.update(payment.id, payment);
                    await helpers_1.mailer
                        .setSubject(messages_1.MESSAGES.preRegistrationEmailSubject)
                        .setMessage(messages_1.MESSAGES.preRegistrationEmailBody(preRegistration.applicationNo, preRegistration.student.application.firstName))
                        .setTo(preRegistration.student.application.email)
                        .setEmailNotificationRepository(this.emailNotificationRepository)
                        .sendDefault();
                }
            }
        }
    }
    async verifyLicense(data) {
        if (data.reference) {
            const payment = await this.findPaymentBy({ reference: data.reference });
            if (payment && payment.status === enums_1.PaymentStatus.Pending) {
                const license = await this.licenseRepository.findOne({
                    where: { reference: payment.reference },
                });
                if (license && license.status === enums_1.LicenseStatus.Pending) {
                    license.status = enums_1.LicenseStatus.Processing;
                    await this.licenseRepository.update({ id: license.id }, license);
                }
                payment.used = enums_1.Reference.Used;
                payment.status = enums_1.PaymentStatus.Used;
                await this.update(payment.id, payment);
            }
        }
    }
    async getRevenueStats() {
        const allowedTypes = [
            enums_1.TransactionType.drivingSchoolCompletionPayment,
            enums_1.TransactionType.drivingSchoolApplication,
            enums_1.TransactionType.inspectionFee,
        ];
        const revenueStats = await this.paymentRepository
            .createQueryBuilder('transactions')
            .select('transactions.itemType', 'itemType')
            .addSelect('COUNT(*)', 'count')
            .addSelect('SUM(transactions.amount)', 'totalAmount')
            .where('transactions.status = :status', { status: enums_1.PaymentStatus.Completed })
            .andWhere('transactions.refunded = false')
            .andWhere('transactions.itemType IN (:...allowedTypes)', { allowedTypes })
            .groupBy('transactions.itemType')
            .getRawMany();
        const refundedStats = await this.paymentRepository
            .createQueryBuilder('transactions')
            .select('COUNT(*)', 'count')
            .addSelect('SUM(transactions.amount)', 'totalAmount')
            .where('transactions.refunded = true')
            .andWhere('transactions.itemType IN (:...allowedTypes)', { allowedTypes })
            .getRawOne();
        return {
            revenue: revenueStats.map((item) => ({
                itemType: item.itemType,
                count: parseInt(item.count),
                amount: parseFloat(item.totalAmount),
            })),
            refunded: {
                count: parseInt(refundedStats?.count || 0),
                amount: parseFloat(refundedStats?.totalAmount || 0),
            },
        };
    }
    async listTransactionLogs(data, user) {
        const response = { success: false, message: '', data: null };
        const search = data.search || null;
        const limit = Number(data.resultPerPage || 10);
        const page = Number(data.page || 1);
        const offset = (page - 1) * limit;
        try {
            const queryBuilder = this.paymentRepository.createQueryBuilder('transactions');
            if (data.type) {
                queryBuilder.andWhere('transactions.type = :type', { type: data.type });
            }
            if (data.status) {
                queryBuilder.andWhere('transactions.status = :status', { status: data.status });
            }
            if (data.reference) {
                queryBuilder.andWhere('transactions.reference LIKE :reference', {
                    reference: `%${data.reference}%`,
                });
            }
            if (data.createdAtStart && data.createdAtEnd) {
                queryBuilder.andWhere('transactions.createdAt BETWEEN :start AND :end', {
                    start: data.createdAtStart,
                    end: data.createdAtEnd,
                });
            }
            if (search) {
                queryBuilder.andWhere('(transactions.email LIKE :search OR transactions.reference LIKE :search', { search: `%${search}%` });
            }
            queryBuilder.skip(offset).take(limit).orderBy('transactions.createdAt', data.order);
            const [result, count] = await queryBuilder.getManyAndCount();
            if (result) {
                response.data = {
                    result,
                    pagination: (0, functions_helpers_1.getPagination)(count, page, offset, limit),
                };
            }
            response.success = true;
            response.message = messages_1.MESSAGES.recordFound;
        }
        catch (error) {
            console.log(error);
            console.log(`Queried by ${user.id}`);
            throw new common_1.InternalServerErrorException(error);
        }
        return response;
    }
};
exports.PaymentService = PaymentService;
exports.PaymentService = PaymentService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(payment_entity_1.Payment)),
    __param(1, (0, typeorm_1.InjectRepository)(payment_setting_entity_1.PaymentSetting)),
    __param(2, (0, typeorm_1.InjectRepository)(license_entity_1.License)),
    __param(3, (0, typeorm_1.InjectRepository)(email_notification_entity_1.EmailNotification)),
    __param(4, (0, typeorm_1.InjectRepository)(pre_registration_entity_1.PreRegistration)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.DataSource])
], PaymentService);
//# sourceMappingURL=payment.service.js.map