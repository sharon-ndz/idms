import { Relation } from 'typeorm';
import { User } from './user.entity';
import { BaseEntity } from './base.entity';
import { DrivingSchool } from './driving-school.entity';
export declare class DrivingSchoolInstructor extends BaseEntity {
    drivingSchoolId: number;
    name: string;
    avatar: string;
    phone: string;
    email: string;
    dateOfBirth: string;
    genderId: number;
    lgaId: number;
    stateId: number;
    address: string;
    isActive: number;
    createdBy: Relation<User>;
    instructorId: string;
    drivingSchool: Relation<DrivingSchool>;
}
