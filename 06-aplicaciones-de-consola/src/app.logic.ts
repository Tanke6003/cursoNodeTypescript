import fs from 'fs';
import { argv } from './config/plugins/args.plugin';
const {b:base, l:limit, s:requiredShow} = argv;

let outputMessage = '';
const headerMessage = `
==================================
       Tabla del ${ base }
==================================\n
`;


outputMessage = headerMessage + outputMessage;

if(requiredShow)
    console.log(outputMessage);

const outputPath = `outputs`;


fs.mkdirSync(outputPath, { recursive: true });
fs.writeFileSync(`${ outputPath }/tabla-${ base }.txt`, outputMessage);
console.log('File created!');

// grabar en el archivo de salida
// path: outputs/tabla-5.txt