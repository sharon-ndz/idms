export declare enum ApiPermission {
    canVerifyLicense = "canVerifyLicense",
    canCreateLicense = "canCreateLicense",
    canModifyLicense = "canModifyLicense",
    canReadLicense = "canReadLicense"
}
export declare const API_PERMISSIONS_KEY = "apiClientPermissions";
export declare const ApiPermissions: (...permissions: ApiPermission[]) => import("@nestjs/common").CustomDecorator<string>;
