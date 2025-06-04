import { LicenseFile } from './license-file.entity';
import { ApplicantFile } from './applicant-file.entity';
export declare class File {
    id: number;
    fileName: string;
    bucketKey: string;
    bucketName: string;
    mimeType: string;
    checksum: string;
    presignedUrl?: string;
    base64String?: string;
    createdAt: Date;
    updatedAt: Date;
    applicantFiles?: ApplicantFile[];
    licenseFiles?: LicenseFile[];
}
