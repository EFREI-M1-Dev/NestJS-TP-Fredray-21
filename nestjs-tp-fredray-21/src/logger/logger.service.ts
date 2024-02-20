import { Injectable } from '@nestjs/common';
import {LoggerInterface} from "./logger.interface";

@Injectable()
export class LoggerService {
    constructor(private options: Record<string, LoggerInterface[]>) {}

    getVal(key: string): LoggerInterface[] {
        return this.options[key];
    }
}