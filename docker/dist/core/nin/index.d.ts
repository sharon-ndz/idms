import { NINResult } from './nin.dto';
declare class Register {
    private authorization;
    getAuthorization(): Promise<void>;
    verifyNIN(nin: string): Promise<NINResult | null>;
    verifyTrackingId(trackingId: string): Promise<any>;
}
declare const ninHelper: Register;
export default ninHelper;
