import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import {BookService} from "../book/book.service";

@Module({
    controllers: [UserController],
    providers: [UserService, BookService],
    exports: [UserService],
})
export class UserModule {}
