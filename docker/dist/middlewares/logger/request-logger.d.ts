import { NextFunction, Response, Request } from 'express';
export type LoggerMiddlewareOptions = {
    log?: (msg: string, ...args: any[]) => void;
};
export declare function requestLogger(options?: LoggerMiddlewareOptions): (req: Request, res: Response, next: NextFunction) => void;
