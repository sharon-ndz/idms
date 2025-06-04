import { PaymentDetailsDto } from './payment.dto';
import { PaymentSetting } from '../../entities/payment-setting.entity';
export declare class PaymentData {
    static readonly unitTopUpCharges = 0.015;
    static readonly unitTopUpCharges32 = 0.032;
    static readonly fixedChargeOnMinimum = 2000;
    static readonly fixedCharge = 50;
    static formatFCMBResponse(queryString: string): any;
    static getDetails(setting: PaymentSetting): PaymentDetailsDto;
    private static addCharges;
}
