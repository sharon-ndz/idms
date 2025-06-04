import { DataSource, Repository } from 'typeorm';
import { AuthUserInfo, DataResultInterface, RequestResultInterface } from '../../core/interfaces/all.interface';
import { DrivingSchool } from '../../entities/driving-school.entity';
import { ActionDrivingSchoolApplicationDto, ApplicationStatsDto, AssignOfficerDto, DirivinSchoolListRequestsDto, DrivingSchoolDto, FetchMasterListDto, FetchStudentListDto, SelfServiceCreateSchoolDto, SubmitDrivingSchoolApplicationDto, UpdateDrivingSchoolApplicationDto, UpdateDrivingSchoolDto, ListApplicationsDto, listDrivingSchoolInspectionsDto, CompleteSchoolApplicationDto, toggleSchoolStatusDto, FetchDashboardStatsRequestDto } from './driving-school.dto';
import { TrainingDuration } from '../../entities/training-duration.entity';
import { DrivingSchoolApplication } from '../../entities/driving-school-application.entity';
import { Student } from '../../entities/student.entity';
import { Payment } from '../../entities/payment.entity';
import { ApplicantFile } from '../../entities/applicant-file.entity';
import { FileInterface } from '../file/file.dto';
import { ApplicationNoDto, BaseRequestDto } from '../../core/interfaces/all.dto';
import { AuthService } from '../auth/auth.service';
import { UsersService } from '../users/users.service';
import { UserResponseDto } from '../users/users.dto';
import { User } from '../../entities/user.entity';
import { EmailNotification } from '../../entities/email-notification.entity';
import { Inspection } from '../../entities/inspection.entity';
import { DrivingSchoolInstructor } from '../../entities/driving-school-instructor.entity';
import { AuditTrail } from '../../entities/audit-trail.entity';
export declare class DrivingSchoolService {
    private readonly drivingSchoolRepository;
    private readonly trainingDurationRepository;
    private readonly drivingSchoolApplicationRepository;
    private readonly studentRepository;
    private readonly paymentRepository;
    private readonly applicantFileRepository;
    private readonly auditTrailRepository;
    private readonly authService;
    private readonly usersService;
    private readonly userRepository;
    private readonly drivingSchoolInstructorRepository;
    private readonly emailNotificationRepository;
    private dataSource;
    private readonly inspectionRepository;
    constructor(drivingSchoolRepository: Repository<DrivingSchool>, trainingDurationRepository: Repository<TrainingDuration>, drivingSchoolApplicationRepository: Repository<DrivingSchoolApplication>, studentRepository: Repository<Student>, paymentRepository: Repository<Payment>, applicantFileRepository: Repository<ApplicantFile>, auditTrailRepository: Repository<AuditTrail>, authService: AuthService, usersService: UsersService, userRepository: Repository<User>, drivingSchoolInstructorRepository: Repository<DrivingSchoolInstructor>, emailNotificationRepository: Repository<EmailNotification>, dataSource: DataSource, inspectionRepository: Repository<Inspection>);
    stats(user: AuthUserInfo): Promise<DataResultInterface>;
    findAll(data: ListApplicationsDto, user: AuthUserInfo): Promise<DataResultInterface>;
    getSingle(drivingSchoolId: number, user: AuthUserInfo): Promise<DataResultInterface>;
    createSchool(data: DrivingSchoolDto, user: AuthUserInfo): Promise<DataResultInterface>;
    selfServiceCreateSchool(data: SelfServiceCreateSchoolDto): Promise<DataResultInterface>;
    updateSchool(data: UpdateDrivingSchoolDto, user: AuthUserInfo): Promise<RequestResultInterface>;
    minimalList(data: FetchMasterListDto): Promise<DataResultInterface>;
    findOne(id: number): Promise<DataResultInterface>;
    trainingDurations(id: number): Promise<DataResultInterface>;
    singleTrainingDuration(id: number): Promise<DataResultInterface>;
    submitApplication(data: SubmitDrivingSchoolApplicationDto): Promise<DataResultInterface>;
    updateApplication(data: UpdateDrivingSchoolApplicationDto): Promise<DataResultInterface>;
    checkApplication(data: ApplicationNoDto): Promise<DataResultInterface>;
    changeApplicationStatus(data: ActionDrivingSchoolApplicationDto, user: AuthUserInfo): Promise<DataResultInterface>;
    issueCert(studentNo: string): Promise<DataResultInterface>;
    validateCertNo(certificateNo: string): Promise<DataResultInterface>;
    applicationsStats(data: ApplicationStatsDto, user: AuthUserInfo): Promise<DataResultInterface>;
    applicationsList(data: ListApplicationsDto, user: AuthUserInfo): Promise<DataResultInterface>;
    getSingleApplication(drivingSchoolId: number): Promise<DataResultInterface>;
    studentsStats(data: FetchStudentListDto, user: AuthUserInfo): Promise<DataResultInterface>;
    studentsList(data: FetchStudentListDto, user: AuthUserInfo): Promise<DataResultInterface>;
    studentDetails(studentNo: string): Promise<DataResultInterface>;
    registerStudent(data: SubmitDrivingSchoolApplicationDto, user: AuthUserInfo): Promise<DataResultInterface>;
    saveFileRecord(id: number, files: FileInterface[]): Promise<void>;
    getBaseRecord(files: any[]): Promise<any[]>;
    getLasdriStats(user: AuthUserInfo): Promise<DataResultInterface>;
    getDrivingSchoolList(query: DirivinSchoolListRequestsDto): Promise<{
        records: DrivingSchool[];
        total: number;
    }>;
    assignLasdriOfficer(data: AssignOfficerDto, user: AuthUserInfo): Promise<RequestResultInterface>;
    completeApplication(data: CompleteSchoolApplicationDto, user: AuthUserInfo): Promise<{
        success: boolean;
        message: string;
    }>;
    toggleDrivingSchoolStatus(id: number, data: toggleSchoolStatusDto, user: AuthUserInfo): Promise<DataResultInterface>;
    drivingSchoolInspections(drivingSchoolId: number, data: listDrivingSchoolInspectionsDto): Promise<{
        success: boolean;
        message: string;
        data: any;
    }>;
    confirmApplicationPayment(paymentRef: string, user: AuthUserInfo): Promise<DataResultInterface>;
    queryApplication(drivingSchoolId: number, reasonForQuerying: string, user: AuthUserInfo): Promise<{
        success: boolean;
        message: string;
        data: any;
    }>;
    requestInspection(user: AuthUserInfo): Promise<DataResultInterface>;
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
    getDrivingSchoolDashboardStats(): Promise<{
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
    }>;
    getStudentDashboardStats(): Promise<{
        studentStats: any;
        distributionByAgeGroup: any[];
        distributionByGender: any[];
        studentDistributionByLga: {
            lga: string;
            count: number;
        }[];
    }>;
    getLASDRIROLEDashboardStats(): Promise<{
        stats: {
            total: number;
            active: number;
            inactive: number;
        };
        lasdriOfficerDistributionByLga: {
            lga: string;
            count: number;
        }[];
    }>;
    getRevenueDashboardStats(selectedYear?: number, topLgaCount?: number, bottomLgaCount?: number): Promise<{
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
