import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { AuthUserDto, OTPDataDto, ResetPasswordDto, SendOTPDataDto, UpdatePasswordRequestDto } from './auth.dto';
import { Repository } from 'typeorm';
import { AuthUserInfo, DataResultInterface, RequestResultInterface } from '../../core/interfaces/all.interface';
import { Otp } from '../../entities/otp.entity';
import { EmailNotification } from '../../entities/email-notification.entity';
import { TestNin } from '../../entities/test-nin.entity';
import { User } from '../../entities/user.entity';
import { FileService } from '../file/file.service';
import { Node } from '../../entities/node.entity';
export declare class AuthService {
    private usersService;
    private jwtService;
    private fileService;
    private readonly otpRepository;
    private readonly testNinRepository;
    private readonly nodeRepository;
    private readonly emailNotificationRepository;
    constructor(usersService: UsersService, jwtService: JwtService, fileService: FileService, otpRepository: Repository<Otp>, testNinRepository: Repository<TestNin>, nodeRepository: Repository<Node>, emailNotificationRepository: Repository<EmailNotification>);
    login(data: AuthUserDto): Promise<any>;
    resetPassword(data: ResetPasswordDto): Promise<RequestResultInterface>;
    updatePassword(user: AuthUserInfo, data: UpdatePasswordRequestDto): Promise<RequestResultInterface>;
    sendOtp(data: SendOTPDataDto): Promise<RequestResultInterface>;
    validateOtp(data: OTPDataDto): Promise<RequestResultInterface>;
    resendOtp(data: SendOTPDataDto): Promise<RequestResultInterface>;
    deleteOtp(otp: string): Promise<void>;
    logout(user: AuthUserInfo): Promise<{
        success: boolean;
        message: string;
    }>;
    addTestNin(nin: string, data: any): Promise<{
        message: string;
    }>;
    verifyNIN(nin: string): Promise<DataResultInterface>;
    private getWhereClause;
    getFileByFingerType(fingerType: string, user: User): Promise<string | null>;
}
