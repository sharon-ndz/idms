import { BaseEntity } from './base.entity';
export declare class PaymentSetting extends BaseEntity {
    stateId: number;
    lgaId: number;
    drivingSchoolId: number;
    name: string;
    amount: number;
    charges: number;
    type: string;
    prefix: string;
    status: number;
    currency: string;
}
