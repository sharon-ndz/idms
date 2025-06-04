"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Paystack = void 0;
const axios_1 = __importDefault(require("axios"));
class Paystack {
    constructor() {
        this.api_link = 'https://api.paystack.co/';
    }
    setCurrency(currency) {
        this.currency = currency;
        return this;
    }
    setReferenceNumber(reference) {
        this.reference = reference;
        return this;
    }
    setCallbackUrl(callback_url) {
        this.callback_url = callback_url;
        return this;
    }
    setTransactionAmount(amount) {
        this.amount = amount * 100;
        return this;
    }
    setAuthorization(Authorization) {
        this.Authorization = Authorization;
        return this;
    }
    setCustomer(email) {
        if (!email) {
            throw new Error('name, email and phone number is required');
        }
        this.email = email;
        return this;
    }
    empty(data) {
        return data === undefined || data === null || !data;
    }
    async initialize() {
        if (this.empty(this.amount)) {
            throw new Error('transaction_amount data is required ');
        }
        if (this.empty(this.email)) {
            throw new Error('customer data is required ');
        }
        const payload = {
            reference: this.reference,
            amount: this.amount,
            email: this.email,
            currency: this.currency,
            callback_url: this.callback_url,
        };
        const res = {};
        axios_1.default.defaults.headers.common['Authorization'] = `Bearer ${this.Authorization}`;
        axios_1.default.defaults.headers.common['Content-Type'] = 'application/json';
        axios_1.default.defaults.headers.common['Cache-Control'] = 'no-cache';
        await axios_1.default
            .post(`${this.api_link}transaction/initialize`, payload)
            .then(function (result) {
            const response = result.data;
            if (response.status === true) {
                res.success = true;
                res.message = response.message;
                res.link = response.data.authorization_url;
            }
            else {
                res.success = false;
                res.message = response.message;
            }
        })
            .catch(function (error) {
            console.log(error.response.data);
            res.success = false;
            res.message = error.response.data;
        });
        return res;
    }
    async verify() {
        if (this.empty(this.reference)) {
            throw new Error('reference data is required ');
        }
        const res = {};
        res.success = false;
        axios_1.default.defaults.headers.common['Authorization'] = `Bearer ${this.Authorization}`;
        axios_1.default.defaults.headers.common['Content-Type'] = 'application/json';
        axios_1.default.defaults.headers.common['Cache-Control'] = 'no-cache';
        await axios_1.default
            .get(`${this.api_link}transaction/verify/${this.reference}`)
            .then(function (result) {
            const response = result.data;
            if (response.status) {
                res.success = true;
                res.message = response.message;
                res.data = response.data;
            }
        })
            .catch(function (error) {
            console.log(error.response);
            res.success = false;
            res.message = error.response.data;
        });
        return res;
    }
}
exports.Paystack = Paystack;
//# sourceMappingURL=paystack.helper.js.map