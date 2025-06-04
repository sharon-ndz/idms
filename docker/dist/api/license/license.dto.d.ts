import { CbtScheduleDto } from '../cbt/cbt.dto';
import { FileInterface } from '../file/file.dto';
export declare class LicenseStatsDto {
    type: string;
    status: string;
}
export declare class LicenseStatsWithYearDto extends LicenseStatsDto {
    year: string;
}
export declare class ApproveLicenseDto {
    licenseId: number;
    licenseClassId: number;
    years: number;
}
export declare class UpdateLicenseDto {
    licenseId: number;
    status: string;
    isActive: number;
}
export declare class ExpireLicenseDto {
    licenseId: number;
}
export declare class ValidateLicenseDto {
    licenseNo: string;
    drivingCertNo: string;
}
export declare class AttachFilesDto {
    applicationNo: string;
    files?: FileInterface[];
}
export declare class PreRegistrationRequestDto extends CbtScheduleDto {
    cbtCenterId: number;
    cbtScheduleId: number;
    studentId: number;
    drivingSchoolId: number;
    drivingTestScheduleId: number;
    licenseClassId: number;
    years: number;
    rrr: string;
    certificateNo: string;
    applicationNo: string;
    direct: boolean;
    files?: FileInterface[];
    successRedirectUrl: string;
    failureRedirectUrl: string;
}
export declare class RenewalPreRegistrationDto extends CbtScheduleDto {
    drivingTestCenterId: number;
    drivingTestScheduleId: number;
    oldLicenseNo: string;
    studentId: number;
    drivingSchoolId: number;
    licenseClassId: number;
    years: number;
    source: string;
    applicationNo: string;
    direct: boolean;
    files?: FileInterface[];
    successRedirectUrl: string;
    failureRedirectUrl: string;
}
export declare class NewLicenseRequestDto {
    weight: number;
    height: number;
    eyes: string;
    requestType: string;
    reference: string;
    licenseClassId: number;
    years: number;
    applicationNo: string;
    email: string;
    phone: string;
    nationalityId: number;
    stateId: number;
    lgaId: number;
}
export declare class RenewalLicenseRequestDto {
    weight: number;
    height: number;
    eyes: string;
    reference: string;
    licenseClassId: number;
    years: number;
    oldLicenseNo: string;
    applicationNo: string;
    email: string;
    phone: string;
    nationalityId: number;
    stateId: number;
    lgaId: number;
    source: string;
    isExternal: boolean;
    requestType: string;
    successRedirectUrl: string;
    failureRedirectUrl: string;
}
export declare class MobileRenewalLicenseRequestDto {
    weight: number;
    height: number;
    eyes: string;
    reference: string;
    licenseClassId: number;
    years: number;
    oldLicenseNo: string;
    applicationNo: string;
    email: string;
    phone: string;
    nationalityId: number;
    stateId: number;
    lgaId: number;
    source: string;
    isExternal: boolean;
    requestType: string;
    status?: string;
}
export declare class ReplaceLicenseRequestDto {
    weight: number;
    height: number;
    eyes: string;
    reference: string;
    licenseClassId: number;
    years: number;
    oldLicenseNo: string;
    email: string;
    phone: string;
    nationalityId: number;
    stateId: number;
    lgaId: number;
    source: string;
    isExternal: boolean;
    requestType: string;
    successRedirectUrl: string;
    failureRedirectUrl: string;
    replacementReason: string;
    affidavitNo: string;
}
export declare class MobileReplaceLicenseRequestDto extends MobileRenewalLicenseRequestDto {
    replacementReason: string;
    affidavitNo: string;
    status?: string;
}
