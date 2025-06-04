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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiClientsController = void 0;
const common_1 = require("@nestjs/common");
const api_clients_service_1 = require("./api-clients.service");
const jwt_auth_guard_1 = require("../../guards/jwt-auth.guard");
const api_clients_dto_1 = require("./api-clients.dto");
let ApiClientsController = class ApiClientsController {
    constructor(service) {
        this.service = service;
    }
    async login(data) {
        return this.service.authenticate(data);
    }
    async findAll(data) {
        return await this.service.findAll(data);
    }
    async create(data, req) {
        return await this.service.create(data, req.user);
    }
    async changeStatus(data, req) {
        return this.service.changeStatus(data, req.user);
    }
    async resetPassword(id, req) {
        return this.service.resetPassword({ id }, req.user);
    }
    async update(data, req) {
        return await this.service.update(data, req.user);
    }
};
exports.ApiClientsController = ApiClientsController;
__decorate([
    (0, common_1.Post)('/auth'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [api_clients_dto_1.ApiClientAuthDto]),
    __metadata("design:returntype", Promise)
], ApiClientsController.prototype, "login", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('/'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ApiClientsController.prototype, "findAll", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('/'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [api_clients_dto_1.ApiClientCreateDto, Object]),
    __metadata("design:returntype", Promise)
], ApiClientsController.prototype, "create", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Patch)('/change-status'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [api_clients_dto_1.ApiClientChangeStatusDto, Object]),
    __metadata("design:returntype", Promise)
], ApiClientsController.prototype, "changeStatus", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('/reset-password/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], ApiClientsController.prototype, "resetPassword", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Patch)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [api_clients_dto_1.ApiClientUpdateDto, Object]),
    __metadata("design:returntype", Promise)
], ApiClientsController.prototype, "update", null);
exports.ApiClientsController = ApiClientsController = __decorate([
    (0, common_1.Controller)('api-clients'),
    __metadata("design:paramtypes", [api_clients_service_1.ApiClientsService])
], ApiClientsController);
//# sourceMappingURL=api-clients.controller.js.map