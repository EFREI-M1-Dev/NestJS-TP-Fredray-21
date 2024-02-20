import { Controller, Get } from '@nestjs/common';
import { UserInterface } from './user.interface';
import {UserService} from "./user.service";

@Controller()
export class UserController {
    constructor(
        private readonly userService: UserService,

    ) {}

    @Get('users')
    getAllUsers(): UserInterface[] {
        return this.userService.getAllUsers();
    }
}
