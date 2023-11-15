import { envs } from "../config/plugins/env.plugins";
import { LogSeverityLevel } from "../domain/entities/log.entity";
import { CheckService } from "../domain/use-cases/checks/check-service";
import { CheckServiceMultiple } from "../domain/use-cases/checks/check-service-multiple";
import { SendEmailLogs } from "../domain/use-cases/logs/send-email-logs";
import { FileSystemDataSource } from "../infrastructure/datasources/file-system.datasource";
import { MongoLogDataSource } from "../infrastructure/datasources/mongo.datasource";
import { PostgreSQLLogDataSource } from "../infrastructure/datasources/possgresql.datasource";
import { LogRepositoryImplementation } from "../infrastructure/repositories/log.repository.Implementation";
import { CronService } from "./cron/cron.service";
import { EmailService } from "./email/email.service";


const fsLogRepository = new LogRepositoryImplementation(
  new FileSystemDataSource()
);
const mongoLogRepository = new LogRepositoryImplementation(
  new MongoLogDataSource()
);
const postgresLogRepository = new LogRepositoryImplementation(
  new PostgreSQLLogDataSource()
);
const logRepositories = [fsLogRepository, mongoLogRepository, postgresLogRepository]
const emailService = new EmailService();
export class Server {
  public static async start() {
    console.log("Server started...");
    console.log("The best NOC in the world!!");
    //const logs = await logRepository.getLogs(LogSeverityLevel.high);
    //console.log(logs);
    //mandar Email
    logRepositories.forEach(async (logRepository) => {
      const logs = await logRepository.getLogs(LogSeverityLevel.high);
      console.log(logs);
    });
    // new SendEmailLogs(
    //   emailService,
    //   fileSystemLogRepository
    // ).execute("Ruben.Farias.1999@Outlook.es");
    //
    // emailService.sendEmail({
    //   from: `test <${envs.MAILER_EMAIL}>`,
    //   to: "ruben.farias.1999@outlook.es",
    //   subject: "Test",
    //   htmlBody: "Test",
    // });
    //emailService.sendEmailWithFileSystemLogs("Ruben.Farias.1999@Outlook.es")
    CronService.createCronJob("*/15 * * * * *", () => {
      const url = "https://www.google.com"; //"http://localhost:3000"//;
      new CheckServiceMultiple(
        logRepositories
        ,
        () => {
          console.log("\x1b[32m%s\x1b[0m", `Check service: ${url} is ok`); // Verde para Success
        },
        (error) => {
          console.error("\x1b[31m%s\x1b[0m", error); // Rojo para Error
        }
      ).execute(url);
    });
  }
}