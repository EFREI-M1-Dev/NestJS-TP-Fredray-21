import { Injectable } from '@nestjs/common';
import { BookInterface } from './book.interface';

@Injectable()
export class BookService {
    private books: BookInterface[] = [
        new BookInterface(1, 'Le Seigneur des Anneaux', 'J.R.R. Tolkien'),
        new BookInterface(2, '1984', 'George Orwell'),
        new BookInterface(3, 'Harry Potter à l\'école des sorciers', 'J.K. Rowling'),
        new BookInterface(4, 'Orgueil et Préjugés', 'Jane Austen'),
        new BookInterface(5, 'Le Petit Prince', 'Antoine de Saint-Exupéry')
    ];

    getAllBooks(): BookInterface[] {
        return this.books;
    }

    getBookById(id: number): BookInterface {
        return this.books.find(book => book.getId() === id);
    }

    createBook(book: BookInterface): void {
        this.books.push(book);
    }

    updateBook(updatedBook: BookInterface): void {
        this.books = this.books.map(book => {
            if (book.getId() === updatedBook.getId()) {
                return updatedBook;
            }
            return book;
        });
    }

    deleteBook(id: number): void {
        this.books = this.books.filter(book => book.getId() !== id);
    }
}