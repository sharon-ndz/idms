import { DrivingSchoolService } from './driving-school.service';
import { DataResultInterface, RequestResultInterface } from '../../core/interfaces/all.interface';
import { ActionDrivingSchoolApplicationDto, ApplicationStatsDto, AssignOfficerDto, DirivinSchoolListRequestsDto, DrivingSchoolDto, FetchMasterListDto, FetchStudentListDto, SelfServiceCreateSchoolDto, SubmitDrivingSchoolApplicationDto, UpdateDrivingSchoolApplicationDto, UpdateDrivingSchoolDto, ListApplicationsDto, toggleSchoolStatusDto, listDrivingSchoolInspectionsDto, CompleteSchoolApplicationDto, DrivingSchoolQueryApplicationDto, FetchDashboardStatsRequestDto } from './driving-school.dto';
import { ApplicationNoDto, BaseRequestDto } from '../../core/interfaces/all.dto';
import { UserResponseDto } from '../users/users.dto';
export declare class DrivingSchoolController {
    private readonly service;
    constructor(service: DrivingSchoolService);
    stats(req: any): Promise<DataResultInterface>;
    findAll(data: ListApplicationsDto, req: any): Promise<DataResultInterface>;
    createSchool(data: DrivingSchoolDto, req: any): Promise<DataResultInterface>;
    selfServiceCreateSchool(data: SelfServiceCreateSchoolDto): Promise<DataResultInterface>;
    updateSchool(data: UpdateDrivingSchoolDto, req: any): Promise<RequestResultInterface>;
    minimalList(data: FetchMasterListDto): Promise<DataResultInterface>;
    findOne(id: string): Promise<DataResultInterface>;
    trainingDurations(id: string): Promise<DataResultInterface>;
    singleTrainingDuration(id: string): Promise<DataResultInterface>;
    submitApplication(data: SubmitDrivingSchoolApplicationDto): Promise<DataResultInterface>;
    updateApplication(data: UpdateDrivingSchoolApplicationDto): Promise<DataResultInterface>;
    checkApplication(data: ApplicationNoDto): Promise<DataResultInterface>;
    issueCert(studentNo: string): Promise<DataResultInterface>;
    validateCertNo(certificateNo: string): Promise<DataResultInterface>;
    applicationsStats(data: ApplicationStatsDto, req: any): Promise<DataResultInterface>;
    applicationsList(data: ListApplicationsDto, req: any): Promise<DataResultInterface>;
    getSingleApplication(drivingSchoolId: number): Promise<DataResultInterface>;
    changeApplicationStatus(data: ActionDrivingSchoolApplicationDto, req: any): Promise<DataResultInterface>;
    studentsStats(data: FetchStudentListDto, req: any): Promise<DataResultInterface>;
    studentsList(data: FetchStudentListDto, req: any): Promise<DataResultInterface>;
    studentDetails(studentNo: string): Promise<DataResultInterface>;
    registerStudent(data: SubmitDrivingSchoolApplicationDto, req: any): Promise<DataResultInterface>;
    lasdriStats(req: any): Promise<DataResultInterface>;
    getDrivingSchoolList(data: DirivinSchoolListRequestsDto): Promise<{
        records: import("../../entities/driving-school.entity").DrivingSchool[];
        total: number;
    }>;
    assignLasdriOfficer(data: AssignOfficerDto, req: any): Promise<RequestResultInterface>;
    completeApplication(data: CompleteSchoolApplicationDto, req: any): Promise<RequestResultInterface>;
    toggleDrivingSchoolStatus(id: number, data: toggleSchoolStatusDto, req: any): Promise<RequestResultInterface>;
    drivingSchoolInspections(drivingSchoolId: number, data: listDrivingSchoolInspectionsDto): Promise<DataResultInterface>;
    confirmApplicationPayment(paymentRef: string, req: any): Promise<DataResultInterface>;
    queryApplication(drivingSchoolId: number, data: DrivingSchoolQueryApplicationDto, req: any): Promise<DataResultInterface>;
    requestInspection(req: any): Promise<DataResultInterface>;
    dashboardStats(data: FetchDashboardStatsRequestDto): Promise<{
        applicationStats: {
            totalApplications: any;
            totalApproved: any;
            totalPending: any;
            totalInitiated: any;
            totalQueried: any;
            totalRevalidated: any;
        };
        monthlyChange: {
            initiated: {
                value: number;
                direction: string;
                formatted: string;
            };
            pending: {
                value: number;
                direction: string;
                formatted: string;
            };
            approved: {
                value: number;
                direction: string;
                formatted: string;
            };
            queried: {
                value: number;
                direction: string;
                formatted: string;
            };
            revalidated: {
                value: number;
                direction: string;
                formatted: string;
            };
        };
        applicationDistribution: {
            inspections: number;
            requests: any;
        };
        drivingSchoolDistributionByLga: {
            lga: string;
            count: number;
        }[];
        drivingSchoolDistributionByStatus: {
            label: any;
            value: number;
        }[];
    } | {
        studentStats: any;
        distributionByAgeGroup: any[];
        distributionByGender: any[];
        studentDistributionByLga: {
            lga: string;
            count: number;
        }[];
    } | {
        stats: {
            total: number;
            active: number;
            inactive: number;
        };
        lasdriOfficerDistributionByLga: {
            lga: string;
            count: number;
        }[];
    } | {
        totalRevenue: number;
        revenueByType: {
            itemType: string;
            amount: number;
            percentageChange: {
                value: number;
                direction: string;
                formatted: string;
            };
        }[];
        monthlyRevenueStats: {
            year: number;
            data: {
                month: string;
                revenue: number;
            }[];
        };
        distributionByItemType: {
            itemType: string;
            amount: number;
            percentage: number;
        }[];
        topLgaRevenueDistribution: any;
        bottomLgaRevenueDistribution: any;
    }>;
    listLasdriOfficers(data: BaseRequestDto): Promise<DataResultInterface<UserResponseDto[]>>;
}
