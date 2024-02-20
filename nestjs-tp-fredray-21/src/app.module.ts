import {MiddlewareConsumer, Module, NestModule} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {UserModule} from "./user/user.module";
import {UserController} from "./user/user.controller";
import {LoggerMiddleware} from "./logger/logger.middleware";
import {LoggerModule} from "./logger/logger.module";
import {LoggerInterface} from "./logger/logger.interface";

const optionsLogs: Record<string, LoggerInterface[]> =
{
  logs: LoggerMiddleware.getLogs()
}

@Module({
  imports: [UserModule, LoggerModule.register(optionsLogs)],
  controllers: [AppController, UserController],
  providers: [AppService],
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
