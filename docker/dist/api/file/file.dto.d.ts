import { File } from '../../entities/file.entity';
import { DocumentUploadTypes } from '../../core/constants/enums';
export declare class FileDto {
    id: number;
    fileName: string;
    bucketKey: string;
    bucketName: string;
    mimeType: string;
    checksum: string;
    createdAt: Date;
    constructor(file: File);
}
export declare class FileInterface {
    fileId: number;
    documentType: DocumentUploadTypes;
    fingerType: string;
}
export declare class CreateFileResponseDto {
    file: FileDto;
}
export declare class CreateFileRequestDto {
    fileName: string;
    base64Image: string;
    documentType: string;
    mimeType: string;
}
export declare class SelectedFileFieldsDto {
    id: number;
    fileName: string;
    bucketKey: string;
    presignedUrl?: string;
    base64String?: string;
}
