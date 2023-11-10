import { argv } from "./config/plugins/args.plugin";
import { ServerApp } from "./presentation/server";
//console.log(process.argv)

//console.log(argv)

(async() =>{
    await main();
})();

async function main(){
    const {b:base,l:limit,s:requiredShow,n:fileName,d:destinationPath} = argv
    ServerApp.run({base,limit,requiredShow,fileName,destinationPath});
}