import { BaseEntity } from './base.entity';
import { User } from './user.entity';
import { DrivingSchool } from './driving-school.entity';
export declare class DrivingSchoolApplicationQuery extends BaseEntity {
    application: DrivingSchool;
    reason: string;
    queriedById: number;
    queriedBy: User;
}
