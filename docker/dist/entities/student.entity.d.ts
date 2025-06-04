import { DrivingSchool } from './driving-school.entity';
import { DrivingSchoolApplication } from './driving-school-application.entity';
import { User } from './user.entity';
import { BaseEntity } from './base.entity';
import { Permit } from './permit.entity';
export declare class Student extends BaseEntity {
    drivingSchoolId: number;
    applicationId: number;
    studentNo: string;
    certificateNo: string;
    isActive: number;
    graduated: boolean;
    drivingSchool: DrivingSchool;
    application: DrivingSchoolApplication;
    createdBy: User;
    permit: Permit;
}
