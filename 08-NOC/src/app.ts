import 'dotenv/config';
import {Server} from './presentation/Server';
import { envs } from './config/plugins/env.plugins';


(async()=>  {
   await main();
})();


async function main() {
    Server.start();
    console.log(envs);
}