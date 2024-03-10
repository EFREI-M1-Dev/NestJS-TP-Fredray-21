export class UserInterface {
    private readonly id: number;
    private name: string;
    private password: string;
    private likedBooks: number[];

    constructor(id: number, name: string, password: string, likedBooks: number[] = []) {
        this.id = id;
        this.name = name;
        this.password = password;
        this.likedBooks = likedBooks;
    }

    getId(): number {
        return this.id;
    }

    getName(): string {
        return this.name;
    }

    getPassword(): string {
        return this.password;
    }

    setName(name: string): void {
        this.name = name;
    }

    setPassword(password: string): void {
        this.password = password;
    }

    getLikedBooks(): number[] {
        return this.likedBooks;
    }

    setLikedBooks(likedBooks: number[]): void {
        this.likedBooks = likedBooks;
    }
}