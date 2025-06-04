import { User } from './user.entity';
import { BaseEntity } from './base.entity';
import { DrivingSchool } from './driving-school.entity';
import { InspectionResponse } from '../core/constants/classes';
export declare class Inspection extends BaseEntity {
    drivingSchoolId: number;
    name: string;
    comment: string;
    status: string;
    month: number;
    year: number;
    drivingSchool: DrivingSchool;
    createdBy: User;
    totalScore: number;
    inspectionResult: InspectionResponse[];
    stateId: number;
    queryReasons?: string[];
}
