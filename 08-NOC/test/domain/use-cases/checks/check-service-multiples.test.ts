import { LogRepository } from "../../../../src/domain/repository/log.repository";
import { CheckServiceMultiple } from '../../../../src/domain/use-cases/checks/check-service-multiple';


describe('domain/use-cases/checks/check-service-multiples.ts', () => {
    const mockRepo1 ={
        saveLog: jest.fn(),
        getLogs: jest.fn()
    };
    const mockRepo2 ={
        saveLog: jest.fn(),
        getLogs: jest.fn()
    };
    const mockRepo3 ={
        saveLog: jest.fn(),
        getLogs: jest.fn()
    };
    const successCallback = jest.fn();
    const errorCallback = jest.fn();
    const checkService = new CheckServiceMultiple([mockRepo1,mockRepo2,mockRepo3], successCallback, errorCallback);
    beforeEach(() => {
        jest.clearAllMocks();
    }
    );
    test("Should call successCallback when fetch return true", async () => {
        const wasOK = await checkService.execute("https://www.google.com");
        expect(wasOK).toBe(true);
        expect(successCallback).toHaveBeenCalled();
        expect(errorCallback).not.toHaveBeenCalled();
        expect(mockRepo1.saveLog).toHaveBeenCalled();
        expect(mockRepo2.saveLog).toHaveBeenCalled();
        expect(mockRepo3.saveLog).toHaveBeenCalled();

    });
    test("Should call errorCallback when fetch return false", async () => {
        const wasOK = await checkService.execute("https://www.googldsdsdsdse.com");
        expect(wasOK).toBe(false);
        expect(errorCallback).toHaveBeenCalled();
        expect(successCallback).not.toHaveBeenCalled();
        expect(mockRepo1.saveLog).toHaveBeenCalled();
        expect(mockRepo2.saveLog).toHaveBeenCalled();
        expect(mockRepo3.saveLog).toHaveBeenCalled();
    });
});