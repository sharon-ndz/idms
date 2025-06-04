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
exports.NotificationService = void 0;
const nodemailer_1 = require("nodemailer");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const email_notification_entity_1 = require("../../entities/email-notification.entity");
const enums_1 = require("../../core/constants/enums");
let NotificationService = class NotificationService {
    constructor(emailNotificationRepository) {
        this.emailNotificationRepository = emailNotificationRepository;
    }
    async sendEmail({ to, from, text, html, subject, bcc }) {
        try {
            const transporter = (0, nodemailer_1.createTransport)({
                secure: Boolean(process.env.EMAIL_SECURE),
                host: process.env.EMAIL_HOST,
                port: Number(process.env.EMAIL_PORT),
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASS,
                },
            });
            console.log('SENDING EMAIL TO', to);
            console.log('BCC EMAIL', bcc);
            const sendMailResult = await transporter.sendMail({
                from: from,
                to: to,
                subject,
                html: html,
                text: text,
                bcc,
            });
            console.log('SEND MAIL RESULT', sendMailResult);
            console.log('NOTIFICATION SENT AND UPDATED STATUS CORRECTLY');
            return sendMailResult;
        }
        catch (e) {
            console.log('ERROR: ', e);
            throw e;
        }
    }
    async main(notificationId) {
        console.log({ notificationId: notificationId });
        try {
            const notification = await this.emailNotificationRepository.findOne({
                where: { id: notificationId, status: enums_1.EmailStatus.Pending },
            });
            if (!notification) {
                console.log('NOTIFICATION NOT FOUND', notificationId);
                return 'Notification not found';
            }
            console.log({ notification });
            const { id, from, subject, to, html, text } = notification;
            await this.emailNotificationRepository.update({ id: id }, { status: enums_1.EmailStatus.Processing });
            await this.sendEmail({ to, from, text, html, subject, bcc: '' });
            await this.emailNotificationRepository.update({ id: id }, { status: enums_1.EmailStatus.Completed });
            return 'Notification sent';
        }
        catch (e) {
            console.log('Error sending notification', e);
            await this.emailNotificationRepository.update({ id: notificationId }, { status: enums_1.EmailStatus.Failed });
            return 'Error while sending notification';
        }
    }
};
exports.NotificationService = NotificationService;
exports.NotificationService = NotificationService = __decorate([
    __param(0, (0, typeorm_2.InjectRepository)(email_notification_entity_1.EmailNotification)),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], NotificationService);
//# sourceMappingURL=index.js.map