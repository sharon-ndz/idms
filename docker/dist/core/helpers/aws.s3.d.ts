declare class AttachmentUtils {
    private readonly s3;
    constructor();
    getFile(key: string): Promise<import("@aws-sdk/client-s3").GetObjectCommandOutput>;
    imageUrl(filename: string): string;
    generateUploadUrl(filename: string): Promise<{
        url: string;
        key: string;
    }>;
    localFileToBase64(fileName: string): Promise<any>;
    getPreSignedUrl(filename: string): Promise<string>;
    uploadBase64(param: {
        base64String: string;
        objectKey: string;
        stringContent?: boolean;
    }): Promise<import("@aws-sdk/client-s3").PutObjectCommandOutput>;
    getFileContentBase64(fileName: string): Promise<string>;
    uploadBase64FileToS3(base64Image: string, bucketKey: string, mimeType: string): Promise<import("@aws-sdk/client-s3").PutObjectCommandOutput>;
}
export default AttachmentUtils;
