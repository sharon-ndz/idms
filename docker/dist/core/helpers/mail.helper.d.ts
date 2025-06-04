import { EmailNotification } from '../../entities/email-notification.entity';
import { Repository } from 'typeorm';
export declare class MailHelper {
    private to;
    private subject;
    private message;
    private attachments;
    private extras;
    private emailNotificationRepository;
    private formatMessage;
    setTo(_to: string): MailHelper;
    setSubject(_subject: string): MailHelper;
    setExtras(_extras: any): MailHelper;
    setEmailNotificationRepository(_emailNotificationRepository: Repository<EmailNotification>): MailHelper;
    setBase64Attachment(filename: string, raw: string, contentType?: string): MailHelper;
    setMessage(_message: string): MailHelper;
    private setAttachments;
    sendDefault(): Promise<any>;
    sendTransactionReceipt(): Promise<any>;
    private send;
}
