import { BaseEntity } from './base.entity';
import { PreRegistration } from './pre-registration.entity';
import { DocumentUploadTypes } from '../core/constants/enums';
import { License } from './license.entity';
import { FileFieldsInterface } from '../core/interfaces/all.interface';
export declare class LicenseFile extends BaseEntity {
    documentType?: DocumentUploadTypes;
    fingerType?: string;
    preRegistration: PreRegistration;
    license: License;
    file: FileFieldsInterface;
}
