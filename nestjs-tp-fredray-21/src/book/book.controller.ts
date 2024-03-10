import {Controller, Get, Post, Put, Delete, Body, Param, BadRequestException} from '@nestjs/common';
import { BookInterface } from './book.interface';
import {BookService} from "./book.service";
import {ApiBody, ApiTags} from '@nestjs/swagger';


@ApiTags('Book')
@Controller()
export class BookController {
    constructor(
        private readonly bookService: BookService,
    ) {}

    @Get('books')
    getAllUsers(): BookInterface[] {
        return this.bookService.getAllBooks();
    }

    @Get('book/:id')
    getBookById(@Param('id') id: string): BookInterface {
        return this.bookService.getBookById(parseInt(id, 10));
    }

    @ApiBody({
        description: 'Book data',
        examples: {
            book1: {
                value: {
                    id: 1,
                    name: 'Book de test',
                    author: 'Author de test'
                }
            },
            book4: {
                value: {
                    name: 'Book de test 4',
                    author: 'Author de test 4'
                }
            }
        }
    })
    @Post('books')
    createBook(@Body() bookData: any): void {
        const { id, name, author } = bookData;
        let idBook = id;
        if (!name || !author) {
            throw new BadRequestException('Les données du livre sont incomplètes. Assurez-vous d\'inclure id, name et author.');
        }
        if(idBook)
        {
            const user = this.bookService.getBookById(idBook);
            if(user) throw new BadRequestException('Le livre avec cet id existe déjà');
        } else {
            const books = this.bookService.getAllBooks();
            const lastBook = books[books.length - 1];
            idBook = lastBook.getId() + 1;
        }
        this.bookService.createBook(new BookInterface(idBook, name, author));
    }

    @ApiBody({
        description: 'Book data',
        examples: {
            book1: {
                value: {
                    name: 'Book de test edit',
                    author: 'Author de test edit'
                }
            },
            book4: {
                value: {
                    id: 4,
                    name: 'Book de test 4 edit',
                    author: 'Author de test 4 edit'
                }
            }
        }
    })
    @Put('books')
    updateBook(@Body() updatedBookData: any): void {
        const { id, name, author } = updatedBookData;
        if (!id || !name || !author) {
            throw new BadRequestException('Les données du livre sont incomplètes. Assurez-vous d\'inclure id, name et author.');
        }
        this.bookService.updateBook(new BookInterface(id, name, author));
    }

    @Delete('book/:id')
    deleteBook(@Param('id') id: string): void {
        this.bookService.deleteBook(parseInt(id, 10))
    }
}
