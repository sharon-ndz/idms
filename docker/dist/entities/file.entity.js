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
exports.File = void 0;
const typeorm_1 = require("typeorm");
const class_transformer_1 = require("class-transformer");
const license_file_entity_1 = require("./license-file.entity");
const applicant_file_entity_1 = require("./applicant-file.entity");
let File = class File {
};
exports.File = File;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], File.prototype, "id", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, typeorm_1.Column)({ name: 'file_name' }),
    __metadata("design:type", String)
], File.prototype, "fileName", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, typeorm_1.Column)({ name: 'bucket_key' }),
    __metadata("design:type", String)
], File.prototype, "bucketKey", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, typeorm_1.Column)({ name: 'bucket_name' }),
    __metadata("design:type", String)
], File.prototype, "bucketName", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, typeorm_1.Column)({ name: 'mime_type', length: 50 }),
    __metadata("design:type", String)
], File.prototype, "mimeType", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, typeorm_1.Column)({ name: 'checksum' }),
    __metadata("design:type", String)
], File.prototype, "checksum", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], File.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], File.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => applicant_file_entity_1.ApplicantFile, (applicantFile) => applicantFile.drivingSchool),
    __metadata("design:type", Array)
], File.prototype, "applicantFiles", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => license_file_entity_1.LicenseFile, (licenseFile) => licenseFile.license),
    __metadata("design:type", Array)
], File.prototype, "licenseFiles", void 0);
exports.File = File = __decorate([
    (0, typeorm_1.Entity)({ name: 'files' })
], File);
//# sourceMappingURL=file.entity.js.map