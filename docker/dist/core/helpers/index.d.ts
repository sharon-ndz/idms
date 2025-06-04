import { Paystack } from './paystack.helper';
import { SMSHelper } from './sms.helper';
import { MailHelper } from './mail.helper';
declare const paystack: Paystack;
declare const sms: SMSHelper;
declare const mailer: MailHelper;
export { paystack, sms, mailer };
export declare function addPaging(pageSize: number, pageNumber: number): {
    take: number;
    skip: number;
} | null;
export declare function calculateChange(current: number, previous: number): {
    value: number;
    direction: string;
    formatted: string;
};
