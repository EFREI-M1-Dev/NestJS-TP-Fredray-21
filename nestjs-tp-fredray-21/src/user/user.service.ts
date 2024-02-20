import { Injectable } from '@nestjs/common';
import { UserInterface } from './user.interface';

@Injectable()
export class UserService {
    getAllUsers() : UserInterface[] {
        return [
            new UserInterface(1, 'fred', 'fred'),
            new UserInterface(2, 'ray', 'ray'),
        ];
    }

}
