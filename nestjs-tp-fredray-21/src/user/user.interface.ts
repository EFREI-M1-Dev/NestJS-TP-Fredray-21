export class UserInterface {
    private readonly id: number;
    private readonly name: string;
    private readonly password: string;

    constructor(id: number, name: string, password: string) {
        this.id = id;
        this.name = name;
        this.password = password;
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
}