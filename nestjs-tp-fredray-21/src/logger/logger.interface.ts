export class LoggerInterface {
    private readonly method: string;
    private readonly path: string;
    private readonly body: Record<string, any>;

    constructor(method: string, path: string, body: Record<string, any>) {
        this.method = method;
        this.path = path;
        this.body = body;
    }

    public getMethod(): string {
        return this.method;
    }

    public getPath(): string {
        return this.path;
    }

    public getBody(): Record<string, any> {
        return this.body;
    }
}