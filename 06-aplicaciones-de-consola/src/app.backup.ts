
import fs from "fs";


let outputMessage:string = ``;
const numBase:number = 5;
const headerMessage:string = `
====================================
        Tabla del ${numBase}
====================================\n
`;
for(let i = 1; i <= 10 ; i++ )
    outputMessage +=  `${numBase} x ${i} = ${ numBase * i }\n`;
outputMessage = headerMessage + outputMessage;
console.log(outputMessage);

const outputPath = 'outputs'
fs.mkdirSync(outputPath,{recursive:true});
fs.writeFileSync(`${outputPath}/tabla-${numBase}.txt`,outputMessage);
console.log('file created');