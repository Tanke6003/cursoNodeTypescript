import { CheckService } from "../domain/use-cases/checks/check-service";
import { FileSystemDataSource } from "../infrastructure/datasources/file-system.datasource";
import { LogRepositoryImplementation } from "../infrastructure/repositories/log.repository.Implementation";
import { CronService } from "./cron/cron-service";

const fileSystemLogRepository = new LogRepositoryImplementation(
  new FileSystemDataSource()
);

export class Server {
  public static start() {
    console.log("Server started...");
    console.log("The best NOC in the world!!");
    CronService.createCronJob("*/15 * * * * *", () => {
      //new CheckService().execute("http://localhost:3000");
      const url = "https://www.google.com"; //"http://localhost:3000"//;
      new CheckService(
        fileSystemLogRepository,
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
