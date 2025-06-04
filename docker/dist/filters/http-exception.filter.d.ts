import { ArgumentsHost, ExceptionFilter, HttpException } from '@nestjs/common';
export declare const getErrorDetails: (exception: any) => any;
export declare const getErrorMessage: (exception: any) => string;
export declare class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost): void;
    private getStatus;
    private getErrorType;
}
