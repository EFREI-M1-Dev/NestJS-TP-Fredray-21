import { Injectable } from '@nestjs/common';
import { UserInterface } from './user.interface';

@Injectable()
export class UserService {
    private users: UserInterface[] = [
        new UserInterface(1, 'Frédéric', 'passwordFrederic', [1, 2]),
        new UserInterface(2, 'Dabadie', 'passwordDabadie', [4]),
        new UserInterface(3, 'Raymond', 'passwordRaymond')
    ];

    getAllUsers(): UserInterface[] {
        return this.users;
    }

    getUserById(id: number): UserInterface {
        return this.users.find(user => user.getId() === id);
    }

    createUser(user: UserInterface): void {
        this.users.push(user);
    }

    updateUser(updatedUser: UserInterface): void {
        this.users = this.users.map(user => {
            if (user.getId() === updatedUser.getId()) {
                return updatedUser;
            }
            return user;
        });
    }

    deleteUser(id: number): void {
        this.users = this.users.filter(user => user.getId() !== id);
    }

    getLikedBooks(id: number): number[] {
        const user = this.getUserById(id);
        return user.getLikedBooks();
    }

    addLikedBook(userId: number, bookId: number): void {
        const user = this.getUserById(userId);
        user.setLikedBooks([...user.getLikedBooks(), bookId]);
    }

    removeLikedBook(userId: number, bookId: number): void {
        const user = this.getUserById(userId);
        user.setLikedBooks(user.getLikedBooks().filter(id => id !== bookId));
    }
}
