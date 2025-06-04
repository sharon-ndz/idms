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
exports.DeviceStatsDto = exports.AgentDetailDto = exports.DeviceDetailDto = exports.GetDevicesQueryRequestDto = exports.ToggleNodeStatusDto = exports.PreActivationRequestDto = exports.CreateDeviceRequestDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const enums_1 = require("../../core/constants/enums");
const constants_1 = require("../../core/constants/constants");
const all_dto_1 = require("../../core/interfaces/all.dto");
const class_transformer_1 = require("class-transformer");
const messages_1 = require("../../core/constants/messages");
class CreateDeviceRequestDto {
}
exports.CreateDeviceRequestDto = CreateDeviceRequestDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateDeviceRequestDto.prototype, "deviceImei", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateDeviceRequestDto.prototype, "license", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsEnum)(enums_1.DeviceTypes),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateDeviceRequestDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsIn)(constants_1.organizations.map((o) => o.code), { message: messages_1.MESSAGES.invalidValue('organization code') }),
    __metadata("design:type", String)
], CreateDeviceRequestDto.prototype, "organizationCode", void 0);
__decorate([
    (0, swagger_1.ApiHideProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateDeviceRequestDto.prototype, "organizationName", void 0);
class PreActivationRequestDto {
}
exports.PreActivationRequestDto = PreActivationRequestDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], PreActivationRequestDto.prototype, "deviceImei", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], PreActivationRequestDto.prototype, "license", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], PreActivationRequestDto.prototype, "deviceId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], PreActivationRequestDto.prototype, "requesterEmail", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], PreActivationRequestDto.prototype, "requesterFirstName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], PreActivationRequestDto.prototype, "requesterLastName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], PreActivationRequestDto.prototype, "requesterPhone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsIn)(constants_1.organizations.map((o) => o.code), { message: messages_1.MESSAGES.invalidValue('organization code') }),
    __metadata("design:type", String)
], PreActivationRequestDto.prototype, "organizationCode", void 0);
class ToggleNodeStatusDto {
}
exports.ToggleNodeStatusDto = ToggleNodeStatusDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], ToggleNodeStatusDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: enums_1.DeviceStatus }),
    (0, class_validator_1.IsEnum)(enums_1.DeviceStatus),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], ToggleNodeStatusDto.prototype, "status", void 0);
class GetDevicesQueryRequestDto extends all_dto_1.GetParam {
}
exports.GetDevicesQueryRequestDto = GetDevicesQueryRequestDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], GetDevicesQueryRequestDto.prototype, "search", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: enums_1.DeviceStatus }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], GetDevicesQueryRequestDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Boolean)
], GetDevicesQueryRequestDto.prototype, "pendingApproval", void 0);
class DeviceDetailDto {
}
exports.DeviceDetailDto = DeviceDetailDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], DeviceDetailDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], DeviceDetailDto.prototype, "deviceImei", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], DeviceDetailDto.prototype, "license", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], DeviceDetailDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], DeviceDetailDto.prototype, "organizationCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], DeviceDetailDto.prototype, "organizationName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], DeviceDetailDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], DeviceDetailDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Array)
], DeviceDetailDto.prototype, "agents", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Array)
], DeviceDetailDto.prototype, "agentActivityLogs", void 0);
class AgentDetailDto {
}
exports.AgentDetailDto = AgentDetailDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], AgentDetailDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], AgentDetailDto.prototype, "firstName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], AgentDetailDto.prototype, "lastName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], AgentDetailDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], AgentDetailDto.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], AgentDetailDto.prototype, "createdAt", void 0);
class DeviceStatsDto {
}
exports.DeviceStatsDto = DeviceStatsDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 127, description: 'Total number of devices' }),
    __metadata("design:type", Number)
], DeviceStatsDto.prototype, "totalDevices", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 117, description: 'Total number of active devices' }),
    __metadata("design:type", Number)
], DeviceStatsDto.prototype, "activeDevices", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 4, description: 'Number of pending devices' }),
    __metadata("design:type", Number)
], DeviceStatsDto.prototype, "pendingDevices", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 4, description: 'Number of deactivated devices' }),
    __metadata("design:type", Number)
], DeviceStatsDto.prototype, "deactivatedDevices", void 0);
//# sourceMappingURL=device.dto.js.map