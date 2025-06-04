export declare class AuthEmailDto {
    email: string;
}
export declare class TestNinRequestDto {
    nin: string;
    data: string;
}
export declare class AuthUserDto extends AuthEmailDto {
    password: string;
    fingerType: string;
    deviceId: string;
}
export declare class SendOTPDataDto {
    email: string;
    phone: string;
}
export declare class OTPDataDto extends SendOTPDataDto {
    otp: string;
    deleteOTP: boolean;
}
export declare class ResetPasswordDto extends SendOTPDataDto {
    otp: string;
    password: string;
    confirmPassword: string;
}
export declare class UpdatePasswordRequestDto {
    oldPassword: string;
    password: string;
    confirmPassword: string;
    userId: number;
}
