
export enum LogSeverityLevel {
    low    = 'low',
    medium = 'medium',
    high   = 'high'
}

export interface LogEntityOptions {
    level: LogSeverityLevel;
    message: string;
    createdAt?: Date;
    origin: string;
}

export class LogEntity {
    public level: LogSeverityLevel;
    public message: string;
    public createdAt: Date;
    public origin: string;

    constructor(options: LogEntityOptions) {
        this.level = options.level;
        this.message = options.message;
        this.createdAt = options.createdAt ?? new Date();
        this.origin = options.origin;
    }
    static fromJson = (json:string): LogEntity => {
        const options:LogEntityOptions = JSON.parse(json);
        const log = new LogEntity(options);
        return log;
    }
}