import { CanActivate, ExecutionContext } from '@nestjs/common';
export declare class RecaptchaGuard implements CanActivate {
    canActivate(context: ExecutionContext): Promise<boolean>;
}
