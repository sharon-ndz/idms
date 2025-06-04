import { BaseEntity } from './base.entity';
export declare class Payment extends BaseEntity {
    userId: number;
    email: string;
    amount: number;
    status: string;
    reference: string;
    channel: string;
    type: string;
    currency: string;
    log: string;
    itemType: string;
    itemId: number;
    provider: string;
    used: number;
    charges: number;
    refunded: boolean;
    successRedirectUrl: string;
    failureRedirectUrl: string;
}
