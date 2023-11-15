import { LogDataSource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";
import fs from "fs";

export class FileSystemDataSource implements LogDataSource {
  private readonly logsPath: string = "logs/";
  private readonly allLogsPath: string = "logs/logs-all.log";
  private readonly mediumLogsPath: string = "logs/logs-medium.log";
  private readonly highLogsPath: string = "logs/logs-high.log";
  constructor() {
    this.createLogsFiles();
  }
  private createLogsFiles = (): void => {
    if (!fs.existsSync(this.logsPath)) fs.mkdirSync(this.logsPath);
    [this.allLogsPath, this.mediumLogsPath, this.highLogsPath].forEach(
      (path) => {
        if (!fs.existsSync(path)) fs.writeFileSync(path, "");
      }
    );
  };

  private getLogsFromFile = (path: string): LogEntity[] => {
    const content = fs.readFileSync(path, "utf-8");
    if (content === "") return [];
    const logs: LogEntity[] = content.split("\n").map(LogEntity.fromJson);
    return logs;
  };


  async saveLog(newLog: LogEntity): Promise<void> {
    const logJson = `${JSON.stringify(newLog)}\n`;
    fs.appendFileSync(this.allLogsPath, logJson);
    if (newLog.level === LogSeverityLevel.low) return;
    if (newLog.level === LogSeverityLevel.medium) {
      fs.appendFileSync(this.mediumLogsPath, logJson);
    } else {
      fs.appendFileSync(this.highLogsPath, logJson);
    }
  }


  async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
    switch (severityLevel) {
      case LogSeverityLevel.low:
        return this.getLogsFromFile(this.allLogsPath);
      case LogSeverityLevel.medium:
        return this.getLogsFromFile(this.mediumLogsPath);
      case LogSeverityLevel.high:
        return this.getLogsFromFile(this.highLogsPath);
      default:
        throw new Error("severityLevel not found");
    }
  }

  
}
