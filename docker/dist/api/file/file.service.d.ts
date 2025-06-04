import { Repository } from 'typeorm';
import { CreateFileRequestDto, FileDto } from './file.dto';
import { File } from '../../entities/file.entity';
export declare class FileService {
    private readonly fileRepository;
    constructor(fileRepository: Repository<File>);
    create(createFileDto: CreateFileRequestDto): Promise<{
        file: FileDto;
    }>;
    getFileById(id: number): Promise<string>;
    getPreSignedUrlByFileId(id: number): Promise<string>;
}
