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
exports.HttpExceptionFilter = exports.getErrorMessage = exports.getErrorDetails = void 0;
const common_1 = require("@nestjs/common");
const all_dto_1 = require("../core/interfaces/all.dto");
const logger_1 = __importDefault(require("../core/logger"));
const getErrorDetails = (exception) => {
    if (exception.response instanceof all_dto_1.ErrorData || exception.message instanceof all_dto_1.ErrorData) {
        return exception.response.details || exception.message.details;
    }
    if (Array.isArray(exception?.response?.message)) {
        return exception.response.message;
    }
};
exports.getErrorDetails = getErrorDetails;
const getErrorMessage = (exception) => {
    if (!exception || !exception.message) {
        return 'Internal server error';
    }
    if (typeof exception.message === 'string') {
        return exception.message;
    }
    if (exception.message instanceof all_dto_1.ErrorData) {
        return exception.message.message;
    }
    return exception.message.message;
};
exports.getErrorMessage = getErrorMessage;
let HttpExceptionFilter = class HttpExceptionFilter {
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const error = this.getErrorType(exception);
        const details = (0, exports.getErrorDetails)(exception);
        const message = details || (0, exports.getErrorMessage)(exception);
        logger_1.default.error(message, exception, details);
        const statusCode = this.getStatus(exception);
        response.status(statusCode).json({
            statusCode,
            error,
            message,
        });
    }
    getStatus(exception) {
        if (typeof exception.getStatus === 'function') {
            return exception.getStatus();
        }
        return exception.statusCode || exception.status || 500;
    }
    getErrorType(exception) {
        return (exception && exception.constructor.name) || 'Error';
    }
};
exports.HttpExceptionFilter = HttpExceptionFilter;
exports.HttpExceptionFilter = HttpExceptionFilter = __decorate([
    (0, common_1.Catch)()
], HttpExceptionFilter);
//# sourceMappingURL=http-exception.filter.js.map