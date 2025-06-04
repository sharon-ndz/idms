"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailHelper = void 0;
const common_1 = require("@nestjs/common");
const constants_1 = require("../constants/constants");
const messages_1 = require("../constants/messages");
const email_tpl_1 = __importDefault(require("../templates/email.tpl"));
const payment_tpl_1 = __importDefault(require("../templates/payment.tpl"));
const html_to_text_1 = require("html-to-text");
const aws_s3_1 = __importDefault(require("./aws.s3"));
const uuid_1 = require("uuid");
const enums_1 = require("../constants/enums");
const email_notification_entity_1 = require("../../entities/email-notification.entity");
const notifications_1 = require("./notifications");
let MailHelper = class MailHelper {
    constructor() {
        this.attachments = [];
    }
    formatMessage(template, data) {
        for (const key in data) {
            const value = data[key];
            const re = new RegExp('{{' + key + '}}', 'g');
            template = template.replace(re, value);
        }
        return template;
    }
    setTo(_to) {
        this.to = _to;
        return this;
    }
    setSubject(_subject) {
        this.subject = _subject;
        return this;
    }
    setExtras(_extras) {
        this.extras = _extras;
        this.extras['payee'] = this.to;
        return this;
    }
    setEmailNotificationRepository(_emailNotificationRepository) {
        this.emailNotificationRepository = _emailNotificationRepository;
        return this;
    }
    setBase64Attachment(filename, raw, contentType) {
        this.attachments.push({
            filename: filename,
            content: Buffer.from(raw, 'base64'),
            encoding: 'base64',
            contentType: contentType,
        });
        return this;
    }
    setMessage(_message) {
        this.message = _message;
        return this;
    }
    async setAttachments(attachments) {
        const attachedDocuments = [];
        for (let index = 0; index < attachments.length; index++) {
            const attachment = attachments[index];
            const fileName = `${(0, uuid_1.v4)()}-${attachment.filename}`;
            const awsS3bucket = new aws_s3_1.default();
            await awsS3bucket.uploadBase64({
                base64String: attachment.content.toString('base64'),
                objectKey: fileName,
                stringContent: true,
            });
            attachedDocuments.push({
                filename: attachment.filename,
                path: fileName,
                encoding: attachment.encoding,
            });
        }
        this.attachments = [];
        return attachedDocuments;
    }
    async sendDefault() {
        if (this.to == null) {
            throw new common_1.InternalServerErrorException('to must not be null');
        }
        if (this.subject == null) {
            throw new common_1.InternalServerErrorException('subject must not be null');
        }
        if (this.message == null) {
            throw new common_1.InternalServerErrorException('message must not be null');
        }
        const attachments = await this.setAttachments(this.attachments);
        const emailData = {
            header: this.subject,
            message: this.message,
            date: new Date().toLocaleString('en-NG', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
                second: 'numeric',
                hour12: true,
            }),
            app_name: constants_1.appConstants.appName,
            sitelink: constants_1.appConstants.siteLink,
            disclaimer: messages_1.MESSAGES.mailDisclaimer,
        };
        const template = this.formatMessage(email_tpl_1.default, emailData);
        const text = (0, html_to_text_1.convert)(this.message);
        return await this.send(text, template, attachments);
    }
    async sendTransactionReceipt() {
        if (this.to == null) {
            throw new common_1.InternalServerErrorException('to must not be null');
        }
        if (this.subject == null) {
            throw new common_1.InternalServerErrorException('subject must not be null');
        }
        if (this.extras == null) {
            throw new common_1.InternalServerErrorException('extras must not be null');
        }
        const attachments = await this.setAttachments(this.attachments);
        const emailData = {
            header: this.subject,
            message: this.message,
            date: new Date().toLocaleString('en-NG', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
                second: 'numeric',
                hour12: true,
            }),
            app_name: constants_1.appConstants.appName,
            sitelink: constants_1.appConstants.siteLink,
            disclaimer: messages_1.MESSAGES.mailDisclaimer,
            ...this.extras,
        };
        const template = this.formatMessage(payment_tpl_1.default, emailData);
        const text = (0, html_to_text_1.convert)(this.message);
        return await this.send(text, template, attachments);
    }
    async send(text, template, attachments) {
        let emailID = null;
        try {
            const emailNotification = new email_notification_entity_1.EmailNotification();
            emailNotification.from = constants_1.emailConstant.sender;
            emailNotification.to = this.to;
            emailNotification.subject = this.subject;
            emailNotification.text = text;
            emailNotification.html = `${template}`;
            emailNotification.status = enums_1.EmailStatus.Pending;
            emailNotification.attachments = attachments;
            const email = await this.emailNotificationRepository.insert(emailNotification);
            await (0, notifications_1.sendEmailNotification)({ id: email.raw[0].id });
            emailID = email.raw[0].id;
        }
        catch (error) {
            console.log(error);
            return { success: false, message: error.message };
        }
        return { success: true, message: `Email Created for: ${this.to}`, emailID };
    }
};
exports.MailHelper = MailHelper;
exports.MailHelper = MailHelper = __decorate([
    (0, common_1.Injectable)()
], MailHelper);
//# sourceMappingURL=mail.helper.js.map