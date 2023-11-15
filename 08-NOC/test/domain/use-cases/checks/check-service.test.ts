import { LogEntity } from "../../../../src/domain/entities/log.entity";
import { CheckService } from "../../../../src/domain/use-cases/checks/check-service";


describe('domain/use-cases/checks/check-service.ts', () => {
    const mockRepository = {
        saveLog: jest.fn(),
        getLogs: jest.fn()
    }
    const successCallback = jest.fn();
    const errorCallback = jest.fn();
    const checkService = new CheckService(mockRepository,successCallback,errorCallback);
    beforeEach(()=>{
        jest.clearAllMocks();
    }
    );
    test("Should call successCallback when fetch return true",async()=>{
        
        const wasOK =  await checkService.execute("https://www.google.com");
        expect(wasOK).toBe(true);
        expect(successCallback).toHaveBeenCalled();
        expect(errorCallback).not.toHaveBeenCalled();
        expect(mockRepository.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
    });
    test("Should call errorCallback when fetch return false",async()=>{
        const wasOK =  await checkService.execute("https://www.googldsdsdsdse.com");
        expect(wasOK).toBe(false);
        expect(errorCallback).toHaveBeenCalled();
        expect(successCallback).not.toHaveBeenCalled();
        expect(mockRepository.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
    });
});