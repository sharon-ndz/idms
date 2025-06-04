"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../constants/constants");
const axios_1 = __importDefault(require("axios"));
const common_1 = require("@nestjs/common");
const messages_1 = require("../constants/messages");
class Register {
    async getAuthorization() {
        try {
            const { data } = await axios_1.default.post(`${constants_1.ninConstant.link}/auth`, {
                apiKey: constants_1.ninConstant.apiKey,
                apiSecretKey: constants_1.ninConstant.apiSecretKey,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            this.authorization = data.acces_token;
        }
        catch (error) {
            throw new Error(`Authentication error: ${error}`);
        }
    }
    async verifyNIN(nin) {
        try {
            const { data } = await axios_1.default.get(`${constants_1.ninVerifyConstant.link}/verifyNinBirthReg`, {
                auth: {
                    username: constants_1.ninVerifyConstant.authUser,
                    password: constants_1.ninVerifyConstant.authPass,
                },
                params: { nin },
            });
            const { nimc } = data;
            if (nimc?.status == 1) {
                return nimc;
            }
            else {
                console.log(data);
                throw new common_1.BadRequestException(nimc?.message || messages_1.MESSAGES.ninVerificationFailed);
            }
        }
        catch (error) {
            console.log(error);
            throw new common_1.BadRequestException(error.message);
        }
    }
    async verifyTrackingId(trackingId) {
        try {
            const { data } = await axios_1.default.get(`${constants_1.ninVerifyConstant.link}/verifyTrackingIdBirthReg`, {
                auth: {
                    username: constants_1.ninVerifyConstant.authUser,
                    password: constants_1.ninVerifyConstant.authPass,
                },
                params: { trackingId },
            });
            return data;
        }
        catch (error) {
            console.log(error);
            return null;
        }
    }
}
const ninHelper = new Register();
exports.default = ninHelper;
//# sourceMappingURL=index.js.map