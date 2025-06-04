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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommonService = void 0;
const common_1 = require("@nestjs/common");
const aws_s3_1 = __importDefault(require("../../core/helpers/aws.s3"));
let CommonService = class CommonService {
    constructor() { }
    async fileUploadUrl(fileName) {
        if (!fileName) {
            throw new common_1.BadRequestException({
                statusCode: 400,
                message: ['File name is required'],
            });
        }
        const awsS3bucket = new aws_s3_1.default();
        return await awsS3bucket.generateUploadUrl(fileName);
    }
    async getPreSignedUrl(fileName) {
        if (!fileName) {
            throw new common_1.BadRequestException({
                statusCode: 400,
                message: ['File name is required'],
            });
        }
        let url;
        try {
            const awsS3bucket = new aws_s3_1.default();
            url = await awsS3bucket.getPreSignedUrl(fileName);
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
        return {
            url: url,
        };
    }
};
exports.CommonService = CommonService;
exports.CommonService = CommonService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], CommonService);
//# sourceMappingURL=common.service.js.map