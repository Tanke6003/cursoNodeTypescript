import fs from 'fs';
import { SaveFile } from './save-file.use-case';

describe('domain/use-case/save-file',()=>{
  
    const options = {
        fileContent:'custom content',
        destinationPath:'custom-outputs',
        fileName:'custom-table-name'
    }
    const customFilePathExcpected =options.destinationPath+'/'+options.fileName +'.txt';
    beforeEach(()=>{
        jest.clearAllMocks();
    })
    afterEach(()=>{
        //clean up
        if(fs.existsSync(customFilePathExcpected))fs.rmSync(options.destinationPath,{recursive:true});
    })
    afterAll(()=>{
        if(fs.existsSync('outputs'))fs.rmSync('outputs',{recursive:true});
    })
    test('Should save file with default values',()=>{

  

        const saveFile = new SaveFile();
        const fileExpected = 'outputs/table.txt'
        const options = {
            fileContent:'test content'
        }
        const result = saveFile.execute(options)   
        
        expect(result).toBeTruthy();
        const checkFile = fs.existsSync(fileExpected);
        const fileContent = fs.readFileSync(fileExpected,{ encoding:'utf-8'})
        expect(checkFile).toBeTruthy();
        expect(fileContent).toBe(options.fileContent);
    });
    test('Should save file with custom values',()=>{

        
        const saveFile = new SaveFile();
        const result = saveFile.execute(options)   
        const checkFile = fs.existsSync(customFilePathExcpected);
        const fileContent = fs.readFileSync(customFilePathExcpected,{ encoding:'utf-8'});

        expect(result).toBeTruthy();
        expect(checkFile).toBeTruthy();
        expect(fileContent).toBe(options.fileContent);

    });
    test('Should return false if directory could not be created',()=>{
        const saveFile = new SaveFile();
        const mkdirSpy = jest.spyOn(fs,'mkdirSync').mockImplementation(()=> {throw new Error('test error directory')});
        const result = saveFile.execute(options);
        expect(result).toBeFalsy();
        mkdirSpy.mockRestore();
    })
    test('Should return false if file could not be created',()=>{
        const saveFile = new SaveFile();
        const writeFileSpy = jest.spyOn(fs,'writeFileSync').mockImplementation(()=> {throw new Error('test error file create')});
        const result = saveFile.execute({fileContent:'hola'});
        expect(result).toBeFalsy();
        writeFileSpy.mockRestore();

    })


});