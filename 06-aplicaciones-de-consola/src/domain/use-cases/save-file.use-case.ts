import fs from 'fs';

export interface SaveFileUseCase {
    execute:(options:SaveFileOptions)=>boolean;
}
export interface SaveFileOptions{
    fileContent:string;
    destinationPath?:string;
    fileName?:string;
}



export class SaveFile implements SaveFileUseCase {
    constructor(){
        //storage Repository
    }

    execute({fileContent,destinationPath= `outputs`,fileName=`table`}: SaveFileOptions):boolean{
        try
        {
            fs.mkdirSync(destinationPath, { recursive: true });
            fs.writeFileSync(`${ destinationPath }/${fileName}.txt`, fileContent);
            return true;  
        }
        catch(error)
        {
            console.error(error);
            return false;
        }

    }
}