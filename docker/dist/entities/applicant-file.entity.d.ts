import { BaseEntity } from './base.entity';
import { DocumentUploadTypes } from '../core/constants/enums';
import { DrivingSchool } from './driving-school.entity';
import { FileFieldsInterface } from '../core/interfaces/all.interface';
import { DrivingSchoolApplication } from './driving-school-application.entity';
export declare class ApplicantFile extends BaseEntity {
    documentType?: DocumentUploadTypes;
    fingerType: string;
    drivingSchoolApplication: DrivingSchoolApplication;
    drivingSchool: DrivingSchool;
    file: FileFieldsInterface;
}
