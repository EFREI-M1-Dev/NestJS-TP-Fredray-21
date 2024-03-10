

export class BookInterface{
    readonly id: number;
    name: string;
    author: string;

    constructor(id: number, name: string, author: string) {
        this.id = id;
        this.name = name;
        this.author = author;
    }

    getId(): number {
        return this.id;
    }

    getName(): string {
        return this.name;
    }

    getAuthor(): string {
        return this.author;
    }

    setName(name: string): void {
        this.name = name;
    }

    setAuthor(author: string): void {
        this.author = author;
    }
}