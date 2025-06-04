"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mailer = exports.sms = exports.paystack = void 0;
exports.addPaging = addPaging;
exports.calculateChange = calculateChange;
const paystack_helper_1 = require("./paystack.helper");
const sms_helper_1 = require("./sms.helper");
const mail_helper_1 = require("./mail.helper");
const paystack = new paystack_helper_1.Paystack();
exports.paystack = paystack;
const sms = new sms_helper_1.SMSHelper();
exports.sms = sms;
const mailer = new mail_helper_1.MailHelper();
exports.mailer = mailer;
function addPaging(pageSize, pageNumber) {
    return {
        take: pageSize,
        skip: pageSize * (pageNumber - 1),
    };
}
function calculateChange(current, previous) {
    if (previous === 0 && current === 0) {
        return { value: 0, direction: 'up', formatted: '0%' };
    }
    if (previous === 0 && current > 0) {
        return { value: 100, direction: 'up', formatted: '↑ 100%' };
    }
    const rawChange = ((current - previous) / previous) * 100;
    const value = Math.abs(Number(rawChange.toFixed(1)));
    const direction = rawChange >= 0 ? 'up' : 'down';
    const arrow = direction === 'up' ? '↑' : '↓';
    return {
        value,
        direction,
        formatted: `${arrow} ${value}%`,
    };
}
//# sourceMappingURL=index.js.map