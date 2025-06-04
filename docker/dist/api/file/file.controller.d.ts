import { FileService } from './file.service';
import { CreateFileRequestDto, CreateFileResponseDto } from './file.dto';
export declare class FileController {
    private readonly service;
    constructor(service: FileService);
    create(createFileDto: CreateFileRequestDto): Promise<CreateFileResponseDto>;
}
