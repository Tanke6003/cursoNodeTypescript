
import { LogDataSource } from '../../../src/domain/datasources/log.datasource';
import { LogEntity, LogSeverityLevel } from "../../../src/domain/entities/log.entity";


describe("domain/datasources/log.datasource.ts", () => {
    const newLog = new LogEntity({
        message: "test-message",
        origin: "log.datasource.ts",
        level: LogSeverityLevel.high,
    });
    class MockLogDataSource implements LogDataSource {
        async saveLog(log: LogEntity): Promise<void> {
            return;
        }
        async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
            return [newLog];
        }

    }

    test("Should test de abstract class", async () => {

        const mocklogDataSource = new MockLogDataSource();

        expect(mocklogDataSource).toBeInstanceOf(MockLogDataSource);
        expect(typeof mocklogDataSource.saveLog).toBe('function');
        expect(typeof mocklogDataSource.getLogs).toBe('function');
        await mocklogDataSource.saveLog(newLog);
        const logs = await mocklogDataSource.getLogs(LogSeverityLevel.high);
        expect(logs).toHaveLength(1);
        expect(logs[0]).toBeInstanceOf(LogEntity);
        expect(logs).toEqual([newLog]);
    });
});