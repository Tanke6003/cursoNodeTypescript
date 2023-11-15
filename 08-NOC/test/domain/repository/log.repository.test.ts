import { LogRepository } from "../../../src/domain/repository/log.repository";
import { LogEntity, LogSeverityLevel } from "../../../src/domain/entities/log.entity";



describe("domain/repository/log.repository.ts", () => {
    const newLog = new LogEntity({
        message: "test-message",
        origin: "log.datasource.ts",
        level: LogSeverityLevel.high,
    });
    class MockLogRepository implements LogRepository {
        async saveLog(log: LogEntity): Promise<void> {
            return;
        }
        async getLogs(severityLevel: string): Promise<LogEntity[]> {
            return [newLog];
        }

    }



    test("Should test de abstract class repository", async () => {
        const mocklogRepository = new MockLogRepository();
        expect(mocklogRepository).toBeInstanceOf(MockLogRepository);
        expect(typeof mocklogRepository.saveLog).toBe('function');
        expect(typeof mocklogRepository.getLogs).toBe('function');
        await mocklogRepository.saveLog(newLog);
        const logs = await mocklogRepository.getLogs(LogSeverityLevel.high);
        expect(logs).toHaveLength(1);
        expect(logs[0]).toBeInstanceOf(LogEntity);
        expect(logs).toEqual([newLog]);
    });
});