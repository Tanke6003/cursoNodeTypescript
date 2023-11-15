import { LogEntity, LogSeverityLevel, LogEntityOptions } from '../../entities/log.entity';
import { LogRepository } from '../../repository/log.repository';

interface checkServiceMultipleUseCase{
    execute(url:string):Promise<boolean>;
}

type SuccessCallback = (() => void |undefined);
type ErrorCallback = ((error:string) => void |undefined);



export class CheckServiceMultiple implements checkServiceMultipleUseCase{

    constructor(
        private readonly LogRepository:LogRepository[],
        private readonly successCallback?:SuccessCallback,
        private readonly errorCallback?:ErrorCallback
    ){

    }
    private callLogs =  (log:LogEntity) => {
        this.LogRepository.forEach( logRepository => {
            logRepository.saveLog(log);
    })
    }
    async execute(url:string):Promise<boolean>{
        try {
            const res = await fetch(url);
            if(!res.ok) throw new Error(`Error on check service: ${url}`)
            const LogEntityOptions:LogEntityOptions = {
                level: LogSeverityLevel.low,
                message: `Service ${url} is working`,
                origin: 'CheckService'
            }
            const log = new LogEntity(LogEntityOptions);
            this.callLogs(log);
            this.successCallback && this.successCallback();
            return true;
        } catch (error) {
            const errorMessage = `${url} : ${error}`;
            const logEntityOptions:LogEntityOptions = {
                level: LogSeverityLevel.high,
                message: errorMessage,
                origin: 'CheckService'
            }
            const log = new LogEntity(logEntityOptions);
            this.callLogs(log);
            this.errorCallback && this.errorCallback(errorMessage);
            return false;
        }
    }
}
