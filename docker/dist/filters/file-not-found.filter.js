"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileNotFoundExceptionFilter = void 0;
const common_1 = require("@nestjs/common");
let FileNotFoundExceptionFilter = class FileNotFoundExceptionFilter {
    catch(exception, host) {
        const response = host.switchToHttp().getResponse();
        response.status(404).json({
            statusCode: 404,
            message: 'The requested url could not be found',
            error: 'Not Found',
        });
    }
};
exports.FileNotFoundExceptionFilter = FileNotFoundExceptionFilter;
exports.FileNotFoundExceptionFilter = FileNotFoundExceptionFilter = __decorate([
    (0, common_1.Catch)(common_1.NotFoundException)
], FileNotFoundExceptionFilter);
//# sourceMappingURL=file-not-found.filter.js.map