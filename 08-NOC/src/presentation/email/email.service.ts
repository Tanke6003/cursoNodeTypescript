import nodemailer from 'nodemailer'
import { envs } from '../../config/plugins/env.plugins';

interface EmailOptions {
    from: string,
    to: string,
    subject: string,
    htmlBody: string,
    //todo: add attachments
}


export class EmailService {
    private transporter = nodemailer.createTransport({
        service: envs.MAILER_SERVICE,
        auth: {
            user: envs.MAILER_EMAIL,
            pass: envs.MAILER_SECRET_KEY
        }

    });

    async sendEmail(options:EmailOptions): Promise<boolean> {
        const { from, to, subject, htmlBody } = options;
        try {
            const sendInfo = await this.transporter.sendMail({
                from,
                to,
                subject,
                html: htmlBody
            });
            console.log(sendInfo);
            return true;
        } catch (error) {


            return false;
        }
    }

}