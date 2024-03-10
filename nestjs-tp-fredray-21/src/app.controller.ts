import {Controller, Get} from '@nestjs/common';
import { AppService } from './app.service';
import {LoggerService} from "./logger/logger.service";
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Global App')
@Controller()
export class AppController {
  constructor(
      private readonly appService: AppService,
      private readonly loggerService: LoggerService,
  ) {}


    @Get('logs')
    getLogs() {
        return this.loggerService.getVal('logs');
    }

}
