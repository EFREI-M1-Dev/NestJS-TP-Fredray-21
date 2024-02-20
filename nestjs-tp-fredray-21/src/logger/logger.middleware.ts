import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import {LoggerInterface} from "./logger.interface";

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    private static loggerArray: LoggerInterface[] = [];

    use(req: Request, res: Response, next: NextFunction) {
        const log = new LoggerInterface(req.method, `/${req.params['0']}`, req.body);
        LoggerMiddleware.loggerArray.push(log);
        console.log('Request...', req.method, req.params['0'], req.body, req.query, req.params);
        next();
    }

    static getLogs(): LoggerInterface[] {
        return LoggerMiddleware.loggerArray;
    }
}
