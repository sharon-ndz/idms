"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiPermissions = exports.API_PERMISSIONS_KEY = exports.ApiPermission = void 0;
const common_1 = require("@nestjs/common");
var ApiPermission;
(function (ApiPermission) {
    ApiPermission["canVerifyLicense"] = "canVerifyLicense";
    ApiPermission["canCreateLicense"] = "canCreateLicense";
    ApiPermission["canModifyLicense"] = "canModifyLicense";
    ApiPermission["canReadLicense"] = "canReadLicense";
})(ApiPermission || (exports.ApiPermission = ApiPermission = {}));
exports.API_PERMISSIONS_KEY = 'apiClientPermissions';
const ApiPermissions = (...permissions) => (0, common_1.SetMetadata)(exports.API_PERMISSIONS_KEY, permissions);
exports.ApiPermissions = ApiPermissions;
//# sourceMappingURL=api.permision.decorator.js.map