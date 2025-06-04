import { Attachment } from '../core/interfaces/all.interface';
export declare class EmailNotification {
    id: number;
    status: string;
    to: string;
    from: string;
    subject: string;
    text: string;
    html: string;
    attachments: Attachment[];
    description: string;
    createdAt: Date;
    updatedAt: Date;
}
