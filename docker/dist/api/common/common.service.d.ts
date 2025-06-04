export declare class CommonService {
    constructor();
    fileUploadUrl(fileName: string): Promise<{
        url: string;
        key: string;
    }>;
    getPreSignedUrl(fileName: string): Promise<{
        url: string;
    }>;
}
