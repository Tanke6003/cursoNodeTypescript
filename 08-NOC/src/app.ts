import {Server} from './presentation/Server';


(async()=>  {
   await main();
})();


async function main() {
    Server.start();
}