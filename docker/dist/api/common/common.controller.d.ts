import { CommonService } from './common.service';
export declare class CommonController {
    private readonly service;
    constructor(service: CommonService);
    fileUploadUrl(fileName: string): Promise<{
        url: string;
        key: string;
    }>;
    getPreSignedUrl(fileName: string): Promise<{
        url: string;
    }>;
}
