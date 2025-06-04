import { User } from '../../entities/user.entity';
import { PaginationInterface } from '../interfaces/all.interface';
declare class HexCode {
    count: number;
    caps?: boolean;
    prefix?: string;
    suffix?: string;
}
export declare function createConsistentHash(key: string): string;
export declare function maskNIN(nin: string): string;
export declare function generateUniqueIntegers(count: number, min: number, max: number): string;
export declare function getFullName(user: User): string;
export declare function slugify(text: string): string;
export declare function getStringInitials(identifier: string, length: number): string;
export declare const getPagination: (count: number, page: number, offset: number, limit: number) => PaginationInterface;
export declare function hexCode(param: HexCode): string;
export declare function removeNullAndEmpty(obj: Record<string, any>): Record<string, any>;
export declare function readJsonFile(filePath: string): Promise<any>;
export declare function writeJsonFile(filePath: string, data: any): Promise<any>;
export declare function removeMimeTypePrefix(base64String: string): string;
export declare function genQRCode(QRCodeData: string): Promise<any>;
export declare function numberCode(count: number): string;
export declare function formatMoney(money: number, currency: string): string;
export declare function getDateTime(dateTime?: boolean): string;
export declare function getDateDiff(d1: Date, d2: Date): number;
export declare function encode(data: any): string;
export declare function decode(base64String: string): string;
export declare function removeProperty(data: any, keys: Array<string>): any;
export declare function convertDate(dateString: string): {
    year: number;
    month: number;
    day: number;
};
export declare function dateWord({ date, month, day, year }: {
    date?: string;
    month?: boolean;
    day?: boolean;
    year?: boolean;
}): string;
export declare function hasValue(value: any): boolean;
export declare function isNumber(value: any): boolean;
export declare function containsKeywords(text: string, keywords: string[]): boolean;
export declare function getUUID(length?: number): string;
export {};
