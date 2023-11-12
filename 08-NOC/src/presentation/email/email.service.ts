import nodemailer from 'nodemailer'
import { envs } from '../../config/plugins/env.plugins';
import { LogRepository } from '../../domain/repository/log.repository';
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity';

interface EmailOptions {
    from: string,
    to: string|string[],
    subject: string,
    htmlBody: string,
    atachments?: Attachment[]
}
interface Attachment{
    filename:string,
    path:string
}



export class EmailService {
    private transporter = nodemailer.createTransport({
        service: envs.MAILER_SERVICE,
        auth: {
            user: envs.MAILER_EMAIL,
            pass: envs.MAILER_SECRET_KEY
        }

    });

    constructor(
    ) {
    }

    async sendEmail(options:EmailOptions): Promise<boolean> {
        const { from, to, subject, htmlBody,atachments = [] } = options;
        try {

            const sendInfo = await this.transporter.sendMail({
                sender:from,
                to:to,
                subject:subject,
                html: htmlBody,
                attachments:atachments,
            });
            const log = new LogEntity({
                level:LogSeverityLevel.low,
                message:`Email sent to ${to} with subject ${subject}`,
                origin:'EmailService'
            });
            return true;
        } catch (error) {
            const log = new LogEntity({
                level:LogSeverityLevel.high,
                message:`Error email was not sent to ${to} with subject ${subject}`,
                origin:'EmailService'
            });
            return false;
        }
    }
    async sendEmailWithFileSystemLogs(to:string|string[]): Promise<boolean> {
        const subject = `Logs del sistema del dia ${new Date().toLocaleDateString()}`;
        try {
            const attachments:Attachment[] = [
                {
                    filename: 'logs-all.log',
                    path: './logs/logs-all.log'
                },
                {
                    filename: 'logs-medium.log',
                    path: './logs/logs-medium.log'
                },
                {
                    filename: 'logs-high.log',
                    path: './logs/logs-high.log'
                }
            ];
            
            const sendInfo = await this.transporter.sendMail({
                sender:`MOC <${envs.MAILER_EMAIL}>`,
                to:to,
                subject:subject,
                html: `<h1>Reporte de logs del sistema</h1>
                <p>Se adjunta el reporte de logs del sistema del dia ${new Date().toLocaleDateString()}</p>
                <p>Saludos</p>
                <p>MOC</p>`,
                attachments:attachments,   
            });
            const log = new LogEntity({
                level:LogSeverityLevel.low,
                message:`Email sent to ${to} with subject ${subject}`,
                origin:'EmailService'
            });
            return true;
        } catch (error) {
            const log = new LogEntity({
                level:LogSeverityLevel.high,
                message:`Error email was not sent to ${to} with subject ${subject}`,
                origin:'EmailService'
            });
            return false;
        }
    }


}