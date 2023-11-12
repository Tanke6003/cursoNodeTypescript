import { CreateTable } from "../domain/use-cases/create-table.use-case";
import { SaveFile } from "../domain/use-cases/save-file.use-case";

export interface RunOptions{
    base:number;
    limit:number;
    requiredShow:boolean;
    fileName:string;
    destinationPath:string;
}


export class ServerApp{
    static run({base,limit,requiredShow,fileName,destinationPath}:RunOptions){
        console.log(`Server running...`);
        const table = new CreateTable().execute({base,limit});
        const wasCreated = new SaveFile().execute({fileContent:table,destinationPath:destinationPath,fileName:fileName});
        if(requiredShow) console.log(table);
        wasCreated ? console.log('File Created!') : console.error('File not created!');
    }
}