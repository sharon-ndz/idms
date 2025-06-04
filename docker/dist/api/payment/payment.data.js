"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentData = void 0;
const enums_1 = require("../../core/constants/enums");
const functions_helpers_1 = require("../../core/helpers/functions.helpers");
class PaymentData {
    static formatFCMBResponse(queryString) {
        function convertKeysToObject(obj) {
            const result = {};
            for (const key in obj) {
                if (obj.hasOwnProperty(key)) {
                    const value = obj[key];
                    const keys = key.split('.');
                    let current = result;
                    for (let i = 0; i < keys.length; i++) {
                        const k = keys[i];
                        if (i === keys.length - 1) {
                            current[k] = value;
                        }
                        else {
                            current[k] = current[k] || {};
                            current = current[k];
                        }
                    }
                }
            }
            return result;
        }
        const params = new URLSearchParams(queryString);
        const result = {};
        params.forEach((value, key) => {
            result[key] = value;
        });
        return convertKeysToObject(result);
    }
    static getDetails(setting) {
        const chargesData = this.addCharges(setting.currency, setting.amount);
        console.log(chargesData);
        return {
            reference: (0, functions_helpers_1.hexCode)({
                count: 8,
                caps: true,
                prefix: setting.prefix,
            }) + new Date().getTime(),
            currency: setting.currency,
            amountToPay: chargesData.amount,
            charges: chargesData.fee + (setting.amount > this.fixedChargeOnMinimum ? this.fixedCharge : 0),
            amount: setting.amount,
        };
    }
    static addCharges(currency, amount) {
        amount = parseFloat(String(amount).replace(/,/g, ''));
        const _32 = amount * this.unitTopUpCharges32;
        const _12 = amount * this.unitTopUpCharges;
        switch (currency) {
            case enums_1.Currency.USD:
                return { amount: Math.ceil(amount + _32), fee: _32 };
            case enums_1.Currency.NGN:
                return { amount: Math.ceil(amount + _12), fee: _12 };
            default:
                return { amount, fee: 0 };
        }
    }
}
exports.PaymentData = PaymentData;
PaymentData.unitTopUpCharges = 0.015;
PaymentData.unitTopUpCharges32 = 0.032;
PaymentData.fixedChargeOnMinimum = 2000;
PaymentData.fixedCharge = 50;
//# sourceMappingURL=payment.data.js.map