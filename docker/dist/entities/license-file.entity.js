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
exports.LicenseFile = void 0;
const typeorm_1 = require("typeorm");
const file_entity_1 = require("./file.entity");
const base_entity_1 = require("./base.entity");
const pre_registration_entity_1 = require("./pre-registration.entity");
const enums_1 = require("../core/constants/enums");
const license_entity_1 = require("./license.entity");
let LicenseFile = class LicenseFile extends base_entity_1.BaseEntity {
};
exports.LicenseFile = LicenseFile;
__decorate([
    (0, typeorm_1.Column)({ name: 'document_type', type: 'varchar', length: 40, nullable: true }),
    __metadata("design:type", String)
], LicenseFile.prototype, "documentType", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'finger_type', length: 90, nullable: true }),
    __metadata("design:type", String)
], LicenseFile.prototype, "fingerType", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => pre_registration_entity_1.PreRegistration, (preRegistration) => preRegistration.licenseFiles, {
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'pre_registration_id', referencedColumnName: 'id' }),
    __metadata("design:type", pre_registration_entity_1.PreRegistration)
], LicenseFile.prototype, "preRegistration", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => license_entity_1.License, (license) => license.licenseFiles, {
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION',
    }),
    (0, typeorm_1.JoinColumn)([{ name: 'license_id', referencedColumnName: 'id' }]),
    __metadata("design:type", license_entity_1.License)
], LicenseFile.prototype, "license", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => file_entity_1.File, (file) => file.licenseFiles, {
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION',
    }),
    (0, typeorm_1.JoinColumn)([{ name: 'file_id', referencedColumnName: 'id' }]),
    __metadata("design:type", Object)
], LicenseFile.prototype, "file", void 0);
exports.LicenseFile = LicenseFile = __decorate([
    (0, typeorm_1.Entity)({ name: 'license_files' })
], LicenseFile);
//# sourceMappingURL=license-file.entity.js.map