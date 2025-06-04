import { RegType, TransactionType } from './enums';
import { Role } from '../../middlewares/roles';
export declare const appConstants: {
    appName: string;
    appLongName: string;
    apiLink: string;
    siteLink: string;
    development: boolean;
    port: number;
    paymentKey: string;
    verifyLink: string;
    website: string;
    logTitle: string;
    totalRescheduleAttempts: number;
};
export declare const jwtConstants: {
    secret: string;
    apiClientSecret: string;
    expiresIn: string;
};
export declare const ninConstant: {
    link: string;
    apiKey: string;
    apiSecretKey: string;
};
export declare const ninVerifyConstant: {
    link: string;
    authUser: string;
    authPass: string;
};
export declare const FCMBPayment: {
    url: string;
    apiOperation: string;
    username: string;
    secret: string;
    merchant: string;
    interactionOperation: string;
    merchantName: string;
};
export declare const awsConstants: {
    s3Bucket: string;
    region: string;
    secret: string;
    accessKeyId: string;
    accountId: string;
    notificationsQueueName: string;
    ETLQueueName: string;
};
export declare const smsConfig: {
    host: string;
    privateKey: string;
    publicKey: string;
    sender: string;
};
export declare const auditAction: {
    LOGOUT: string;
    LOGIN: string;
    RECOVER: string;
    RECORD_MODIFIED: string;
    RECORD_ADD: string;
    RECORD_DELETE: string;
    RECORD_PRINTED: string;
    RECORD_APPROVED: string;
    RECORD_REJECTED: string;
};
export declare const DOB_REGEX: RegExp;
export declare const PASSWORD_REGEX = "^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*()_+{}|:;<>,.?/~]).{8,}$";
export declare const emailConstant: {
    email: {
        host: string;
        port: number;
        secure: boolean;
        tls: {
            rejectUnauthorized: boolean;
            minVersion: string;
        };
        ignoreTLS: boolean;
        auth: {
            user: string;
            pass: string;
        };
    };
    sender: string;
};
export declare const VerificationType: (type: RegType) => string;
export declare const bloodGroups: {
    id: number;
    name: string;
}[];
export declare const maritalStatuses: {
    id: number;
    name: string;
}[];
export declare const genders: {
    id: number;
    name: string;
}[];
export declare const CbtTestAttempts: {
    id: number;
    period: number;
    description: string;
}[];
export declare const licenseClasses: {
    id: number;
    code: string;
    description: string;
}[];
export declare const countries: {
    id: number;
    name: string;
    code: string;
}[];
export declare const permitClasses: {
    id: number;
    name: string;
}[];
export declare const relationships: {
    id: number;
    name: string;
}[];
export declare const states: {
    id: number;
    countryId: number;
    code: string;
    name: string;
}[];
export declare const lgas: {
    id: number;
    stateId: number;
    code: string;
    name: string;
    latitude: string;
    longitude: string;
}[];
export declare const salutations: {
    id: number;
    name: string;
}[];
export declare const occupations: {
    id: number;
    name: string;
}[];
export declare const organizations: {
    code: string;
    name: string;
    roleGroup: Role;
}[];
export declare const nationalities: {
    id: number;
    code: string;
    name: string;
}[];
export declare const MapTransactionType: (type: TransactionType) => string;
