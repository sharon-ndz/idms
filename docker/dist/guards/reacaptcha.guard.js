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
exports.RecaptchaGuard = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = __importDefault(require("axios"));
let RecaptchaGuard = class RecaptchaGuard {
    async canActivate(context) {
        const { headers } = context.switchToHttp().getRequest();
        const recaptchaToken = headers['recaptcha-token'];
        if (!recaptchaToken) {
            throw new common_1.ForbiddenException('Recaptcha Token Missing');
        }
        const { data } = await axios_1.default.post(`https://www.google.com/recaptcha/api/siteverify?response=${recaptchaToken}&secret=${process.env.RACAPTCHA_SECRET_KEY}`);
        if (!data.success) {
            throw new common_1.ForbiddenException('Recaptcha Validation Failed');
        }
        return true;
    }
};
exports.RecaptchaGuard = RecaptchaGuard;
exports.RecaptchaGuard = RecaptchaGuard = __decorate([
    (0, common_1.Injectable)()
], RecaptchaGuard);
//# sourceMappingURL=reacaptcha.guard.js.map