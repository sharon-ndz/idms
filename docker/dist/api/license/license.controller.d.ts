import { LicenseService } from './license.service';
import { DataResultInterface, ListInterface } from '../../core/interfaces/all.interface';
import { ApproveLicenseDto, AttachFilesDto, ExpireLicenseDto, LicenseStatsDto, LicenseStatsWithYearDto, MobileRenewalLicenseRequestDto, MobileReplaceLicenseRequestDto, NewLicenseRequestDto, PreRegistrationRequestDto, RenewalLicenseRequestDto, RenewalPreRegistrationDto, ReplaceLicenseRequestDto, UpdateLicenseDto, ValidateLicenseDto } from './license.dto';
import { ApplicationNoDto, LicenseNoDto } from '../../core/interfaces/all.dto';
export declare class LicenseController {
    private readonly service;
    constructor(service: LicenseService);
    getLicenseSummary(): Promise<{
        totalLicense: number;
        totalRenewed: number;
        totalReplaced: number;
        totalExpired: number;
    }>;
    getMonthlyLicenseVolume(data: LicenseStatsWithYearDto): Promise<{
        month: number;
        count: number;
    }[]>;
    getRenewalRate(startDate: string, endDate: string): Promise<number>;
    getTopExpiredLicensesByState(startDate: string, endDate: string): Promise<{
        lgaId: number;
        count: number;
    }[]>;
    getGenderDistribution(startDate: string, endDate: string): Promise<{
        genderId: number;
        count: number;
    }[]>;
    stats(type: LicenseStatsDto, req: any): Promise<DataResultInterface>;
    findAll(data: ListInterface, req: any): Promise<DataResultInterface>;
    preRegistrations(data: ListInterface, req: any): Promise<DataResultInterface>;
    details(data: ApplicationNoDto): Promise<DataResultInterface>;
    detailsByLicenseNo(data: LicenseNoDto): Promise<DataResultInterface>;
    verifyLicense(data: ValidateLicenseDto): Promise<DataResultInterface>;
    preRegistration(data: PreRegistrationRequestDto, req: any): Promise<DataResultInterface>;
    getPreRegistration(applicationNo: string): Promise<DataResultInterface>;
    preRegistrationDetailsByStudent(studentId: number): Promise<DataResultInterface>;
    submitNewRequest(data: NewLicenseRequestDto): Promise<DataResultInterface>;
    licenseRenewalPreRegistration(data: RenewalPreRegistrationDto, req: any): Promise<DataResultInterface>;
    submitRenewalRequest(data: RenewalLicenseRequestDto, req: any): Promise<DataResultInterface>;
    mobileSubmitRenewalRequest(data: MobileRenewalLicenseRequestDto, req: any): Promise<DataResultInterface>;
    submitReplacementRequest(data: ReplaceLicenseRequestDto, req: any): Promise<DataResultInterface>;
    mobileSubmitReplacementRequest(data: MobileReplaceLicenseRequestDto, req: any): Promise<DataResultInterface>;
    submitPreRegistrationFiles(data: AttachFilesDto): Promise<DataResultInterface>;
    approveLicense(data: ApproveLicenseDto, req: any): Promise<DataResultInterface>;
    updateLicense(data: UpdateLicenseDto): Promise<DataResultInterface>;
    expireLicense(data: ExpireLicenseDto): Promise<DataResultInterface>;
}
