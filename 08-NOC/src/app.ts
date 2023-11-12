import 'dotenv/config';
import {Server} from './presentation/Server';
import { MongoDatabases } from './data/mongo/init';
import { envs } from './config/plugins/env.plugins';



(async()=>  {
   await main();
})();


async function main() {
    await MongoDatabases.connnect({
        mongoUrl: envs.MONGO_URL ,
        dbName: envs.MONGO_DB_NAME,
    });
    Server.start();

}