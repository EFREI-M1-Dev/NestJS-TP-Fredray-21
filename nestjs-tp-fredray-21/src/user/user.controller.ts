import {Controller, Get, Post, Put, Delete, Body, Param, BadRequestException} from '@nestjs/common';
import {UserInterface} from './user.interface';
import {UserService} from "./user.service";
import {BookService} from "../book/book.service";
import {BookInterface} from "../book/book.interface";
import {ApiTags, ApiBody, ApiParam} from '@nestjs/swagger';

@ApiTags('User')
@Controller()
export class UserController {
    constructor(
        private readonly userService: UserService,
        private readonly bookService: BookService
    ) {
    }

    @Get('users')
    getAllUsers(): UserInterface[] {
        return this.userService.getAllUsers();
    }

    @Get('user/:id')
    getUserById(@Param('id') id: string): UserInterface {
        return this.userService.getUserById(parseInt(id, 10));
    }

    @ApiBody({
        description: 'User data',
        examples: {
            user1: {
                value: {
                    id: 1,
                    name: 'John',
                    password: 'password'
                }
            },
            user2: {
                value: {
                    name: 'John',
                    password: 'password'
                }
            }
        }
    })
    @Post('users')
    createUser(@Body() userData: any): void {
        const {id, name, password} = userData;
        let idUser = id;
        if (!name || !password) {
            throw new BadRequestException('Les données de l\'utilisateur sont incomplètes. Assurez-vous d\'inclure id, name et password.');
        }
        if (idUser) {
            const user = this.userService.getUserById(idUser);
            if (user) throw new BadRequestException('L\'utilisateur avec cet id existe déjà.');
        } else {
            const users = this.userService.getAllUsers();
            const lastUser = users[users.length - 1];
            idUser = lastUser.getId() + 1;
        }
        this.userService.createUser(new UserInterface(idUser, name, password));
    }

    @ApiBody({
        description: 'User data',
        examples: {
            user1: {
                value: {
                    id: 1,
                    name: 'John',
                    password: 'password'
                }
            },
            user2: {
                value: {
                    name: 'John',
                    password: 'password'
                }
            }
        }
    })
    @Put('users')
    updateUser(@Body() updatedUserData: any): void {
        const {id, name, password} = updatedUserData;
        if (!id || !name || !password) {
            throw new BadRequestException('Les données de l\'utilisateur sont incomplètes. Assurez-vous d\'inclure id, name et password.');
        }
        this.userService.updateUser(new UserInterface(id, name, password));
    }

    @Delete('user/:id')
    deleteUser(@Param('id') id: string): void {
        this.userService.deleteUser(parseInt(id, 10))
    }

    @Get('user/:id/liked-books')
    getLikedBooks(@Param('id') id: string): BookInterface[] {
        const user = this.userService.getUserById(parseInt(id, 10));
        if (!user) {
            throw new BadRequestException('L\'utilisateur avec cet id n\'existe pas.');
        }
        const arrBooksId = this.userService.getLikedBooks(parseInt(id, 10));
        return arrBooksId.map(id => this.bookService.getBookById(id));
    }

    @ApiParam({
        name: 'id',
        required: true,
        description: 'User id'
    })
    @ApiBody({
        description: 'Book data',
        examples: {
            book1: {
                value: {
                    bookId: 1
                }
            },
            book4: {
                value: {
                    bookId: 4
                }
            }
        }
    })
    @Post('user/:id/liked-books')
    addLikedBook(@Param('id') id: string, @Body() bookData: any): void {
        const {bookId} = bookData;
        if (!bookId) {
            throw new BadRequestException('Les données du livre sont incomplètes. Assurez-vous d\'inclure bookId.');
        }

        const book = this.bookService.getBookById(bookId);
        if (!book) {
            throw new BadRequestException('Le livre avec cet id n\'existe pas.');
        }

        this.userService.addLikedBook(parseInt(id, 10), bookId);
    }

    @Delete('user/:id/liked-books/:bookId')
    removeLikedBook(@Param('id') id: string, @Param('bookId') bookId: string): void {
        this.userService.removeLikedBook(parseInt(id, 10), parseInt(bookId, 10));
    }
}
