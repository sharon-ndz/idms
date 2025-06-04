import { Student } from '../../entities/student.entity';
import { DrivingSchool } from '../../entities/driving-school.entity';
import { License } from '../../entities/license.entity';
import { Repository } from 'typeorm';
import { ApproveLicenseDto } from '../../api/license/license.dto';
import { Permit } from '../../entities/permit.entity';
import { NewPermitRequestDto } from '../../api/permit/permit.dto';
import { DrivingTestCenter } from '../../entities/driving-test-center.entity';
export declare function findOrganizationByCode(code: string): {
    code: string;
    name: string;
    roleGroup: import("../../middlewares/roles").Role;
};
export declare function isNINValid(data: any): boolean;
export declare function isValidDate(dateString: string): boolean;
export declare function hasCompletedTraining(startDate: Date, duration: number): boolean;
export declare function hasExpired(startDate: Date, endDate: Date): boolean;
export declare function isOTPValid(issuedAt: Date): boolean;
export declare function getMapValue(mapObjects: any, key: any, value: any, field: any): any;
export declare function getLicenseApprovalData(data: ApproveLicenseDto, licenseRepository: Repository<License>): Promise<{
    issuedAt: Date;
    expiryAt: Date;
    licenseNo: string;
}>;
export declare function getPermitIssuanceData(data: NewPermitRequestDto, permitRepository: Repository<Permit>): Promise<{
    issuedAt: Date;
    expiryAt: Date;
    permitNo: string;
}>;
export declare const generateDrivingSchoolId: (drivingSchoolRepository: Repository<DrivingSchool>) => Promise<string>;
export declare function generateCertificateNo(student: Student): string;
export declare function generatePreRegApplicationNo(student: Student): string;
export declare function generateStudentNo(drivingSchool: DrivingSchool): string;
export declare const generateDrivingCenterNo: (name: string, drivingTestCenterRepository: Repository<DrivingTestCenter>) => Promise<string>;
export declare function generateDrivingSchoolApplicationNo(drivingSchool: DrivingSchool): string;
export declare const generatePermitNo: (permitRepository: Repository<Permit>) => Promise<string>;
