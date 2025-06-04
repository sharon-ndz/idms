"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileService = void 0;
const common_1 = require("@nestjs/common");
const uuid = __importStar(require("uuid"));
const mime = __importStar(require("mime"));
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const file_dto_1 = require("./file.dto");
const file_entity_1 = require("../../entities/file.entity");
const aws_s3_1 = __importDefault(require("../../core/helpers/aws.s3"));
const constants_1 = require("../../core/constants/constants");
let FileService = class FileService {
    constructor(fileRepository) {
        this.fileRepository = fileRepository;
    }
    async create(createFileDto) {
        let mimeType = mime.getType(createFileDto.fileName);
        if (!mimeType) {
            mimeType = createFileDto.mimeType;
        }
        let fileName = `${uuid.v4()}.${mime.getExtension(mimeType)}`;
        if (createFileDto.fileName.includes('.wsq')) {
            mimeType = 'application/octet-stream';
            fileName = `${uuid.v4()}.wsq`;
        }
        const awsS3bucket = new aws_s3_1.default();
        const s3PutObjectResponse = await awsS3bucket.uploadBase64FileToS3(createFileDto.base64Image, fileName, mimeType);
        const fileRecord = await this.fileRepository.insert({
            fileName: createFileDto.fileName,
            bucketKey: fileName,
            bucketName: constants_1.awsConstants.s3Bucket,
            mimeType,
            checksum: s3PutObjectResponse.ETag.replace(/"/g, ''),
        });
        const savedFile = await this.fileRepository.findOne({ where: { id: fileRecord.raw[0].id } });
        return { file: new file_dto_1.FileDto(savedFile) };
    }
    async getFileById(id) {
        const file = await this.fileRepository.findOne({ where: { id } });
        if (!file) {
            return null;
        }
        const awsS3bucket = new aws_s3_1.default();
        return await awsS3bucket.getFileContentBase64(file.bucketKey);
    }
    async getPreSignedUrlByFileId(id) {
        const file = await this.fileRepository.findOne({ where: { id } });
        if (!file) {
            return null;
        }
        const awsS3bucket = new aws_s3_1.default();
        return await awsS3bucket.getPreSignedUrl(file.bucketKey);
    }
};
exports.FileService = FileService;
exports.FileService = FileService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(file_entity_1.File)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], FileService);
//# sourceMappingURL=file.service.js.map