import { BaseEntity } from './base.entity';
export declare class Otp extends BaseEntity {
    email: string;
    phone: string;
    otp: string;
    issuedAt: Date;
    isUsed: boolean;
}
