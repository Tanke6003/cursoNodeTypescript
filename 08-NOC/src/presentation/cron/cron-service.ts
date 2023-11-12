import { CronJob } from "cron";

type CronTime = string | Date ;
type OnTick = () => void;


export class CronService {

    public static createCronJob(cronTime:CronTime,onTick:OnTick): CronJob {
        var job = new CronJob(cronTime, onTick);
        job.start();

        return job;
    }
}