import { LogEntity } from '../../../../src/domain/entities/log.entity';
import { LogRepository } from '../../../../src/domain/repository/log.repository';
import { SendEmailLogs } from '../../../../src/domain/use-cases/logs/send-email-logs';
import { EmailService } from '../../../../src/presentation/email/email.service';

describe('domain/use-cases/email/send-email-logs.ts', () => {

    const mockEmailService = {
        sendEmail: jest.fn(),
        sendEmailWithFileSystemLogs: jest.fn().mockReturnValue(true)
    };

    const mockLogRepository:LogRepository = {
        saveLog: jest.fn(),
        getLogs: jest.fn()
    };
    beforeEach(() => {
        jest.clearAllMocks();
    });

    const sendEmailLogs = new SendEmailLogs(mockEmailService as any,mockLogRepository ); 

    test("Should call sendEmail and saveLog", async () => {
        
        const result = await sendEmailLogs.execute('Ruben.Farias.1999@Outlook.es');
        expect(result).toBe(true);
        expect(mockEmailService.sendEmailWithFileSystemLogs).toHaveBeenCalledTimes(1);
        expect(mockLogRepository.saveLog).toHaveBeenCalledWith(expect.any(LogEntity))
        expect(mockLogRepository.saveLog).toHaveBeenCalledWith({"createdAt": expect.any(Date), "level": "low", "message": "Email logs sent to Ruben.Farias.1999@Outlook.es", "origin": "sendEmailLogs"} );
    });
    test("Should log in case of error", async () => {
        mockEmailService.sendEmailWithFileSystemLogs.mockResolvedValue(false);
        const result = await sendEmailLogs.execute('Ruben.Farias.1999@Outlook.es');
        expect(result).toBe(false);
        expect(mockEmailService.sendEmailWithFileSystemLogs).toHaveBeenCalledTimes(1);
        expect(mockLogRepository.saveLog).toHaveBeenCalledWith(expect.any(LogEntity))
        expect(mockLogRepository.saveLog).toHaveBeenCalledWith({"createdAt": expect.any(Date),"level": "high","message": "Error: Email logs not send","origin": "sendEmailLogs"} );
    });

});