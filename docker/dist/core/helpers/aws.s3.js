"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const client_s3_1 = require("@aws-sdk/client-s3");
const s3_request_presigner_1 = require("@aws-sdk/s3-request-presigner");
const constants_1 = require("../constants/constants");
const fs_1 = __importDefault(require("fs"));
const path = __importStar(require("path"));
class AttachmentUtils {
    constructor() {
        this.s3 = new client_s3_1.S3Client({
            region: constants_1.awsConstants.region,
            credentials: {
                accessKeyId: constants_1.awsConstants.accessKeyId,
                secretAccessKey: constants_1.awsConstants.secret,
            },
        });
    }
    async getFile(key) {
        const input = {
            Bucket: constants_1.awsConstants.s3Bucket,
            Key: key,
        };
        const command = new client_s3_1.GetObjectCommand(input);
        return await this.s3.send(command);
    }
    imageUrl(filename) {
        return `https://${constants_1.awsConstants.s3Bucket}.s3.amazonaws.com/${filename}`;
    }
    async generateUploadUrl(filename) {
        try {
            const fileName = `${(0, uuid_1.v4)()}-${filename}`;
            const params = {
                Bucket: constants_1.awsConstants.s3Bucket,
                Key: fileName,
            };
            const command = new client_s3_1.PutObjectCommand(params);
            const url = await (0, s3_request_presigner_1.getSignedUrl)(this.s3, command, { expiresIn: 10 * 60 });
            return { url, key: fileName };
        }
        catch (error) {
            console.error('Error generating upload URL:', error);
            throw new Error('Error generating upload URL');
        }
    }
    async localFileToBase64(fileName) {
        const filePath = path.join(__dirname, '..', '..', 'assets', 'images', fileName);
        return new Promise((resolve, reject) => {
            fs_1.default.readFile(filePath, (err, data) => {
                if (err) {
                    reject(err);
                    return;
                }
                const base64String = data.toString('base64');
                resolve(base64String);
            });
        });
    }
    async getPreSignedUrl(filename) {
        try {
            const params = {
                Bucket: constants_1.awsConstants.s3Bucket,
                Key: filename,
            };
            const command = new client_s3_1.GetObjectCommand(params);
            return await (0, s3_request_presigner_1.getSignedUrl)(this.s3, command, { expiresIn: 10 * 60 });
        }
        catch (error) {
            console.error('Error generating Presigned URL:', error);
            throw new Error('Error generating Presigned URL');
        }
    }
    async uploadBase64(param) {
        try {
            const body = param.stringContent
                ? param.base64String
                :
                    Buffer.from(param.base64String, 'base64');
            const uploadParams = {
                Bucket: constants_1.awsConstants.s3Bucket,
                Key: param.objectKey,
                Body: body,
            };
            const data = await this.s3.send(new client_s3_1.PutObjectCommand(uploadParams));
            console.log('file uploaded successfully!');
            return data;
        }
        catch (err) {
            console.error('Error uploading file:', err);
        }
    }
    async getFileContentBase64(fileName) {
        const urlCommand = {
            Bucket: constants_1.awsConstants.s3Bucket,
            Key: fileName,
        };
        const command = new client_s3_1.GetObjectCommand(urlCommand);
        const response = await this.s3.send(command);
        return response.Body.transformToString('base64');
    }
    async uploadBase64FileToS3(base64Image, bucketKey, mimeType) {
        const input = {
            Body: Buffer.from(base64Image, 'base64'),
            Bucket: constants_1.awsConstants.s3Bucket,
            Key: bucketKey,
            ContentType: mimeType,
        };
        const command = new client_s3_1.PutObjectCommand(input);
        return await this.s3.send(command);
    }
}
exports.default = AttachmentUtils;
//# sourceMappingURL=aws.s3.js.map