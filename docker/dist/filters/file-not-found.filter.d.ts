import { NotFoundException } from '@nestjs/common';
import { ExceptionFilter } from '@nestjs/common';
export declare class FileNotFoundExceptionFilter implements ExceptionFilter {
    catch(exception: NotFoundException, host: import('@nestjs/common').ArgumentsHost): void;
}
