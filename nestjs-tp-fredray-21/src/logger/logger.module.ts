import { DynamicModule, Module } from '@nestjs/common';
import { LoggerService } from './logger.service';
import {LoggerMiddleware} from "./logger.middleware";
import {LoggerInterface} from "./logger.interface";

@Module({})
export class LoggerModule {
    static register(options: Record<string, LoggerInterface[]>): DynamicModule {
        return {
            module: LoggerModule,
            providers: [
                {
                    provide: LoggerService,
                    useValue: new LoggerService(options),
                },
            ],
            exports: [LoggerService],
        };
    }
}
