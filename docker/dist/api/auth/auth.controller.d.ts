import { AuthService } from './auth.service';
import { AuthUserDto, OTPDataDto, ResetPasswordDto, SendOTPDataDto, TestNinRequestDto, UpdatePasswordRequestDto } from './auth.dto';
import { DataResultInterface, RequestResultInterface } from '../../core/interfaces/all.interface';
export declare class AuthController {
    private readonly service;
    constructor(service: AuthService);
    login(data: AuthUserDto): Promise<any>;
    sendOtp(data: SendOTPDataDto): Promise<RequestResultInterface>;
    validateOtp(data: OTPDataDto): Promise<RequestResultInterface>;
    resendOtp(data: SendOTPDataDto): Promise<RequestResultInterface>;
    changePassword(resetPasswordDto: ResetPasswordDto): Promise<RequestResultInterface>;
    logout(req: any): Promise<{
        success: boolean;
        message: string;
    }>;
    addTestNIN({ nin, data }: TestNinRequestDto): Promise<{
        message: string;
    }>;
    verifyNIN(nin: string): Promise<DataResultInterface>;
    updatePassword(req: any, updatePasswordDto: UpdatePasswordRequestDto): Promise<RequestResultInterface>;
}
