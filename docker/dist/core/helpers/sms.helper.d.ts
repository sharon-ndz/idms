export declare class SMSHelper {
    private readonly logger;
    private phone;
    private message;
    private smsKeys;
    context(): SMSHelper;
    setPhone(phone: string): SMSHelper;
    setMessage(message: string): SMSHelper;
    send(): Promise<{
        success: boolean;
        message: string;
    }>;
}
