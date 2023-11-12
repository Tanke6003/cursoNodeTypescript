import { LogEntity, LogSeverityLevel, LogEntityOptions } from '../../entities/log.entity';
import { LogRepository } from '../../repository/log.repository';

interface checkServiceUseCase{
    execute(url:string):Promise<boolean>;
}

type SuccessCallback = (() => void |undefined);
type ErrorCallback = ((error:string) => void |undefined);



export class CheckService implements checkServiceUseCase{

    constructor(
        private readonly LogRepository:LogRepository,
        private readonly successCallback?:SuccessCallback,
        private readonly errorCallback?:ErrorCallback
    ){

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
            this.LogRepository.saveLog( log );
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
            this.LogRepository.saveLog( log );
            this.errorCallback && this.errorCallback(errorMessage);
            return false;
        }
    }
}
