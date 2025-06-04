import { DrivingSchool } from './driving-school.entity';
import { User } from './user.entity';
import { BaseEntity } from './base.entity';
export declare class TrainingDuration extends BaseEntity {
    drivingSchoolId: number;
    duration: number;
    durationText: string;
    isActive: number;
    drivingSchool: DrivingSchool;
    createdBy: User;
}
