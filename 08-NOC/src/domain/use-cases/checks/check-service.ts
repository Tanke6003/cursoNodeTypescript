import { LogEntity, LogSeverityLevel } from '../../entities/log.entity';
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
            const log = new LogEntity(`Service ${url} is working`, LogSeverityLevel.low);
            this.LogRepository.saveLog( log );
            this.successCallback && this.successCallback();
            return true;
        } catch (error) {
            const errorMessage = `${url} : ${error}`;
            const log = new LogEntity(errorMessage, LogSeverityLevel.high);
            this.LogRepository.saveLog( log );
            this.errorCallback && this.errorCallback(errorMessage);
            return false;
        }
    }
}
