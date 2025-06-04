import { BaseRequestDto, GetParam } from '../../core/interfaces/all.dto';
import { FileInterface, SelectedFileFieldsDto } from '../file/file.dto';
import { InspectionStatus, Reg, StatisticsFilter, Status } from '../../core/constants/enums';
import { PageOptionsDto } from '../../core/interfaces/page-options.dto';
export declare class DrivingSchoolDto {
    name: string;
    email: string;
    logo: string;
    phone: string;
    stateId: number;
    lgaId: number;
    address: string;
    isActive: number;
    trainingDurations: number[];
}
export declare class SelfServiceCreateSchoolDto {
    name: string;
    email: string;
    logo: string;
    phone: string;
    stateId: number;
    lgaId: number;
    address: string;
    rcNumber: string;
    password: string;
}
export declare class UpdateDrivingSchoolDto {
    name: string;
    email: string;
    logo: string;
    phone: string;
    stateId: number;
    lgaId: number;
    address: string;
    isActive: number;
    id: number;
}
export declare class FetchMasterListDto extends GetParam {
    stateId: number;
    lgaId: string;
}
export declare class FetchStudentListDto extends BaseRequestDto {
    graduated: string;
}
export declare class DrivingSchoolCommonDto {
    titleId: number;
    firstName: string;
    middleName: string;
    lastName: string;
    maidenName: string;
    email: string;
    phone: string;
    genderId: string;
    dateOfBirth: string;
    placeOfBirth: string;
    nationalityId: number;
    stateOfOriginId: number;
    lgaOfOriginId: number;
    address: string;
    files: FileInterface[];
    maritalStatusId: number;
    bloodGroupId: number;
    occupationId: string;
    trainingDurationId: number;
    nextOfKinName: string;
    nextOfKinPhone: string;
    nextOfKinRelationshipId: number;
    nextOfKinNationalityId: number;
    nin: string;
    courseLevel: string;
}
export declare class SubmitDrivingSchoolApplicationDto extends DrivingSchoolCommonDto {
    drivingSchoolId: number;
    reference: string;
}
export declare class UpdateDrivingSchoolApplicationDto extends DrivingSchoolCommonDto {
    id: number;
    files: FileInterface[];
}
export declare class ActionDrivingSchoolApplicationDto {
    applicationId: string;
    status: number;
}
export declare class ApplicationStatsDto {
    status: string;
}
export declare class SelectedApplicantFileDto {
    id: number;
    fileId: number;
    documentType: string;
    file?: SelectedFileFieldsDto;
}
export declare class DrivingSchoolStatsDto {
    totalSchools: number;
    activeSchools: number;
    probationSchools: number;
    suspendedSchools: number;
}
export declare class DirivinSchoolListRequestsDto extends PageOptionsDto {
    name?: string;
    identifier?: string;
    email?: string;
    phone?: string;
    status: Status;
}
export declare class AssignOfficerDto {
    officerId: number;
    inspectionDate: Date;
    drivingSchoolId: number;
}
export declare class DrivingSchoolApplicationStatsDto {
    totalApplications: number;
    totalInspections: number;
    pendingApplications: number;
    acknowledgedApplicaitons: number;
}
export declare class InspectionListRequestsDto extends PageOptionsDto {
    name?: string;
    applicationId?: string;
    email?: string;
    phone?: string;
    status?: Status;
    createdAtStart?: string;
    createdAtEnd?: string;
}
export declare class ListApplicationsDto extends BaseRequestDto {
    regStatus?: Reg.Approved | Reg.Pending | Reg.Queried;
    isActive?: Status.Active | Status.Inactive;
    stateId?: number;
    lgaId?: number;
    createdAtStart?: string;
    createdAtEnd?: string;
}
export declare class listDrivingSchoolInspectionsDto extends BaseRequestDto {
    status?: InspectionStatus;
}
export declare class CompleteSchoolApplicationDto {
    totalVehicles: number;
    vehicleTypes: string[];
    specialGadgets?: string;
    totalSimulators: number;
    teachingAids?: string;
    trainingRange?: string;
    totalClassrooms: number;
    classRoomCapacity?: string;
    totalInstructors: number;
    instructorIDs: string[];
    docType: string;
    docFile: string;
}
export declare class toggleSchoolStatusDto {
    status?: Status;
    reason?: string;
}
export declare class DrivingSchoolQueryApplicationDto {
    reason: string;
}
export declare class FetchDashboardStatsRequestDto {
    type: StatisticsFilter;
    selectedYear?: number;
    topLgaCount?: number;
    bottomLgaCount?: number;
}
