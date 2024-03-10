import {MiddlewareConsumer, Module, NestModule} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {UserModule} from "./user/user.module";
import {LoggerMiddleware} from "./logger/logger.middleware";
import {LoggerModule} from "./logger/logger.module";
import {LoggerInterface} from "./logger/logger.interface";
import {BookModule} from "./book/book.module";

const optionsLogs: Record<string, LoggerInterface[]> =
{
  logs: LoggerMiddleware.getLogs()
}

@Module({
  imports: [UserModule, LoggerModule.register(optionsLogs), BookModule],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
