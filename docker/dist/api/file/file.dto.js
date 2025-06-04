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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SelectedFileFieldsDto = exports.CreateFileRequestDto = exports.CreateFileResponseDto = exports.FileInterface = exports.FileDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const enums_1 = require("../../core/constants/enums");
class FileDto {
    constructor(file) {
        this.id = file.id;
        this.fileName = file.fileName;
        this.bucketKey = file.bucketKey;
        this.bucketName = file.bucketName;
        this.mimeType = file.mimeType;
        this.checksum = file.checksum;
        this.createdAt = file.createdAt;
    }
}
exports.FileDto = FileDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], FileDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], FileDto.prototype, "fileName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], FileDto.prototype, "bucketKey", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], FileDto.prototype, "bucketName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], FileDto.prototype, "mimeType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], FileDto.prototype, "checksum", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: Date,
        format: 'date',
        example: '2023-09-24T23:27:52.860Z',
    }),
    __metadata("design:type", Date)
], FileDto.prototype, "createdAt", void 0);
class FileInterface {
}
exports.FileInterface = FileInterface;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], FileInterface.prototype, "fileId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsEnum)(enums_1.DocumentUploadTypes),
    __metadata("design:type", String)
], FileInterface.prototype, "documentType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], FileInterface.prototype, "fingerType", void 0);
class CreateFileResponseDto {
}
exports.CreateFileResponseDto = CreateFileResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", FileDto)
], CreateFileResponseDto.prototype, "file", void 0);
class CreateFileRequestDto {
}
exports.CreateFileRequestDto = CreateFileRequestDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateFileRequestDto.prototype, "fileName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)({ description: 'Remove data:image/png;base64,' }),
    __metadata("design:type", String)
], CreateFileRequestDto.prototype, "base64Image", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateFileRequestDto.prototype, "documentType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateFileRequestDto.prototype, "mimeType", void 0);
class SelectedFileFieldsDto {
}
exports.SelectedFileFieldsDto = SelectedFileFieldsDto;
//# sourceMappingURL=file.dto.js.map