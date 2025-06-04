"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SMSHelper = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = __importDefault(require("axios"));
const constants_1 = require("../constants/constants");
class SMSHelper {
    constructor() {
        this.logger = new common_1.Logger(SMSHelper.name);
        this.smsKeys = {
            '1000': 'All Messages sent successfully',
            '1001': 'Not All Messages were sent successfully due to insufficient balance',
            '1002': 'Missing API Parameters',
            '1003': 'Insufficient balance',
            '1004': 'Mismatched API key',
            '1005': 'Invalid Phone Number',
            '1006': 'invalid Sender ID. Sender ID must not be more than 11 Characters. Characters include white space.',
            '1007': 'Message scheduled for later delivery',
            '1008': 'Empty Message',
            '1009': 'SMS sending failed',
            '1010': 'No messages has been sent on the specified dates using the specified api key',
        };
    }
    context() {
        return this;
    }
    setPhone(phone) {
        this.phone = phone;
        return this;
    }
    setMessage(message) {
        this.message = message;
        return this;
    }
    async send() {
        if (this.phone == null) {
            throw new common_1.InternalServerErrorException('Phone must not be null');
        }
        if (this.message == null) {
            throw new common_1.InternalServerErrorException('message must not be null');
        }
        const context = this.context();
        return new Promise(async (resolve, reject) => {
            await axios_1.default
                .post(constants_1.smsConfig.host, {
                privatekey: constants_1.smsConfig.privateKey,
                publickey: constants_1.smsConfig.publicKey,
                sender: constants_1.smsConfig.sender,
                numbers: this.phone,
                message: this.message,
            })
                .then(function (res) {
                const response = res.data;
                const result = {
                    success: false,
                    message: context.smsKeys[response.status],
                };
                if (response.status == '1000' || response.status == '1007') {
                    result.success = true;
                }
                resolve(result);
            })
                .catch(function (error) {
                context.logger.log(error);
                reject(error);
            });
        });
    }
}
exports.SMSHelper = SMSHelper;
//# sourceMappingURL=sms.helper.js.map