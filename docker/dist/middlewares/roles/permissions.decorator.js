"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Permissions = exports._KEY = exports.Permission = exports.RoleName = exports.Role = void 0;
const common_1 = require("@nestjs/common");
var Role;
(function (Role) {
    Role[Role["FRSC"] = 1] = "FRSC";
    Role[Role["Admin"] = 2] = "Admin";
    Role[Role["SchoolAdmin"] = 3] = "SchoolAdmin";
    Role[Role["MVAA"] = 4] = "MVAA";
    Role[Role["DVIS"] = 5] = "DVIS";
    Role[Role["LASDRI"] = 6] = "LASDRI";
    Role[Role["MVAA_ADMIN"] = 7] = "MVAA_ADMIN";
    Role[Role["DVIS_ADMIN"] = 8] = "DVIS_ADMIN";
    Role[Role["LASDRI_ADMIN"] = 9] = "LASDRI_ADMIN";
})(Role || (exports.Role = Role = {}));
const RoleName = (roleId) => {
    switch (Number(roleId)) {
        case 1:
            return 'FRSC';
        case 2:
            return 'Admin';
        case 3:
            return 'School Administrator';
        case 4:
            return 'Motor Vehicle Administration Agency';
        case 5:
            return 'State Vehicle Inspection Service';
        case 6:
            return "State Driver's Institute";
        case 7:
            return 'MVAA Administrator';
        case 8:
            return 'DVIS Administrator';
        case 9:
            return 'LASDRI Administrator';
        default:
            return 'unknown';
    }
};
exports.RoleName = RoleName;
var Permission;
(function (Permission) {
    Permission["canSeeNewLicense"] = "canSeeNewLicense";
    Permission["canListNewLicense"] = "canListNewLicense";
    Permission["canViewNewLicense"] = "canViewNewLicense";
    Permission["canRegisterNewLicense"] = "canRegisterNewLicense";
    Permission["canModifyNewLicense"] = "canModifyNewLicense";
    Permission["canQueryNewLicense"] = "canQueryNewLicense";
    Permission["canApproveNewLicense"] = "canApproveNewLicense";
    Permission["canSeeLicenseRenewal"] = "canSeeLicenseRenewal";
    Permission["canListLicenseRenewal"] = "canListLicenseRenewal";
    Permission["canViewLicenseRenewal"] = "canViewLicenseRenewal";
    Permission["canModifyLicenseRenewal"] = "canModifyLicenseRenewal";
    Permission["canQueryLicenseRenewal"] = "canQueryLicenseRenewal";
    Permission["canApproveLicenseRenewal"] = "canApproveLicenseRenewal";
    Permission["canSeeLicenseReplacement"] = "canSeeLicenseReplacement";
    Permission["canViewLicenseReplacement"] = "canViewLicenseReplacement";
    Permission["canListLicenseReplacement"] = "canListLicenseReplacement";
    Permission["canQueryLicenseReplacement"] = "canQueryLicenseReplacement";
    Permission["canApproveLicenseReplacement"] = "canApproveLicenseReplacement";
    Permission["canSeeModification"] = "canSeeModification";
    Permission["canListModification"] = "canListModification";
    Permission["canViewModification"] = "canViewModification";
    Permission["canQueryModification"] = "canQueryModification";
    Permission["canApproveModification"] = "canApproveModification";
    Permission["canSeeUser"] = "canSeeUser";
    Permission["canManageUser"] = "canManageUser";
    Permission["canManageSchoolAdmins"] = "canManageSchoolAdmins";
    Permission["canManageFRSC"] = "canManageFRSC";
    Permission["canSeeDrivingSchool"] = "canSeeDrivingSchool";
    Permission["canListDrivingSchool"] = "canListDrivingSchool";
    Permission["canViewDrivingSchool"] = "canViewDrivingSchool";
    Permission["canResetDrivingSchoolPassword"] = "canResetDrivingSchoolPassword";
    Permission["canApproveDrivingSchool"] = "canApproveDrivingSchool";
    Permission["canRejectDrivingSchool"] = "canRejectDrivingSchool";
    Permission["canDeactivateDrivingSchool"] = "canDeactivateDrivingSchool";
    Permission["canActivateDrivingSchool"] = "canActivateDrivingSchool";
    Permission["canSeeVerification"] = "canSeeVerification";
    Permission["canSeeTransactionReport"] = "canSeeTransactionReport";
    Permission["canListTransactionReport"] = "canListTransactionReport";
    Permission["canViewTransactionReport"] = "canViewTransactionReport";
    Permission["canViewTransactionReportCards"] = "canViewTransactionReportCards";
    Permission["canRefundTransaction"] = "canRefundTransaction";
    Permission["canSeeLicenseApproval"] = "canSeeLicenseApproval";
    Permission["canSeeLicenseModificationApproval"] = "canSeeLicenseModificationApproval";
    Permission["canSeeLicenseNotification"] = "canSeeLicenseNotification";
    Permission["canListLicenseNotification"] = "canListLicenseNotification";
    Permission["canViewLicenseNotification"] = "canViewLicenseNotification";
    Permission["isFRSC"] = "isFRSC";
    Permission["isSchoolAdmin"] = "isSchoolAdmin";
    Permission["isAdmin"] = "isAdmin";
})(Permission || (exports.Permission = Permission = {}));
exports._KEY = 'permissions';
const Permissions = (...permissions) => (0, common_1.SetMetadata)(exports._KEY, permissions);
exports.Permissions = Permissions;
//# sourceMappingURL=permissions.decorator.js.map