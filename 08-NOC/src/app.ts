import 'dotenv/config';
import {Server} from './presentation/Server';
import { MongoDatabases } from './data/mongo';
import { envs } from './config/plugins/env.plugins';
import { PrismaClient } from '@prisma/client';




(async()=>  {
   await main();
})();


async function main() {
    await MongoDatabases.connnect({
        mongoUrl: envs.MONGO_URL ,
        dbName: envs.MONGO_DB_NAME,
    });
    const prisma = new PrismaClient();
    // const newLog = await prisma.logModel.create({
    //     data: {
    //         message: 'Test Message',
    //         level: 'HIGH',
    //         origin: 'App.ts',
    //     }
    // });
    // const logs = await prisma.logModel.findMany({
    //     where: {
    //         level: 'LOW'
    //     }
    // });
    //console.log(logs);
    Server.start();

}