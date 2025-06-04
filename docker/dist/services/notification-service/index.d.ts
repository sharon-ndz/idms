import { Repository } from 'typeorm';
import { EmailNotification } from '../../entities/email-notification.entity';
export declare class NotificationService {
    private readonly emailNotificationRepository;
    constructor(emailNotificationRepository: Repository<EmailNotification>);
    sendEmail({ to, from, text, html, subject, bcc }: {
        to: any;
        from: any;
        text: any;
        html: any;
        subject: any;
        bcc: any;
    }): Promise<import("nodemailer/lib/smtp-transport").SentMessageInfo>;
    main(notificationId: number): Promise<"Notification not found" | "Notification sent" | "Error while sending notification">;
}
