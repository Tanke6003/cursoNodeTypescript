
import { LogEntity, LogSeverityLevel } from "../../../src/domain/entities/log.entity";


describe("domain/entities/log.entity.ts", () => {
    const logObject = {
        message: "test-message",
        origin: "log.entity.test.ts",
        level: LogSeverityLevel.high,
    }
    test("Should create a LogEntity instance ", () => {
        
        const log = new LogEntity(logObject);

        expect(log).toBeInstanceOf(LogEntity);
        expect(log.message).toBe(logObject.message);
        expect(log.origin).toBe(logObject.origin);
        expect(log.level).toBe(logObject.level);
        expect(log.createdAt).toBeInstanceOf(Date);
    });
    test("Should create a LogEntity instance form json", () => {
        const json = `{"level":"low","message":"Service https://www.google.com is working","createdAt":"2023-11-12T22:59:16.529Z","origin":"CheckService"}`;
        const log = LogEntity.fromJson(json);
        expect(log).toBeInstanceOf(LogEntity);
        expect(log.message).toBe("Service https://www.google.com is working");
        expect(log.origin).toBe("CheckService");
        expect(log.level).toBe(LogSeverityLevel.low);
        expect(log.createdAt).toBeInstanceOf(Date);
    });
    test("Should create a LogEntity instance form object", () => {
        const log = LogEntity.fromObject(logObject);
        expect(log).toBeInstanceOf(LogEntity);
        expect(log.message).toBe(logObject.message);
        expect(log.origin).toBe(logObject.origin);
        expect(log.level).toBe(logObject.level);
        expect(log.createdAt).toBeInstanceOf(Date);
    });
    
});