import { EmailService } from "../../../presentation/email/email.service";
import { LogEntity, LogSeverityLevel } from "../../entities/log.entity";
import { LogRepository } from "../../repository/log.repository";


interface SendLogEmailInterface {
    execute:(to:string|string[]) => Promise<boolean>;
}

export class SendEmailLogs implements SendLogEmailInterface {


    constructor(
        private readonly emailService:EmailService,
        private readonly logRepository:LogRepository
    ) {
    }

    async execute(to:string|string[]): Promise<boolean> {
        try {
            const send = await this.emailService.sendEmailWithFileSystemLogs(to);
            if(!send) throw Error('Email logs not send');
            const log = new LogEntity({
                level:LogSeverityLevel.low,
                message:`Email logs sent to ${to}`,
                origin:'sendEmailLogs'
            });
            this.logRepository.saveLog(log);
            return true
        } catch (error) {
            const log = new LogEntity({
                level:LogSeverityLevel.high,
                message:`${error}`,
                origin:'sendEmailLogs'
            });
            this.logRepository.saveLog(log);
            return false;
        }
    }
}