import { after } from 'node:test';
import { ServerApp,RunOptions } from './server'
import { CreateTable } from '../domain/use-cases/create-table.use-case';
import { SaveFile } from '../domain/use-cases/save-file.use-case';

describe("presentation/server",()=>{
    const options:RunOptions = {
        base:2,
        limit:10,
        requiredShow:false,
        destinationPath:"testFolder",
        fileName:"testFile"
    }

    test("should create ServerApp instance",()=>{
        const serverApp = new ServerApp();
        expect(serverApp).toBeInstanceOf(ServerApp);
        expect( typeof ServerApp.run).toBe('function')
    })
    beforeAll(()=>{
        jest.clearAllMocks();
    });
    afterAll(()=>{
        //clean up
        const fs = require('fs');
        if(fs.existsSync('testFolder'))fs.rmSync('testFolder',{recursive:true});
    })
    test("should run ServerApp with options",()=>{
            const spyLog = jest.spyOn(console,'log');
            const createTableSpy = jest.spyOn(CreateTable.prototype,'execute');
            const saveFileSpy = jest.spyOn(SaveFile.prototype,'execute');
            
            ServerApp.run(options)
            expect(spyLog).toHaveBeenCalledTimes(2)
            expect(spyLog).toHaveBeenCalledWith('Server running...')
            expect(spyLog).toHaveBeenLastCalledWith('File Created!')
            expect(createTableSpy).toHaveBeenCalledTimes(1);
            expect(createTableSpy).toHaveBeenCalledWith({base:options.base,limit:options.limit})
            expect(saveFileSpy).toHaveBeenCalledTimes(1);
            expect(saveFileSpy).toHaveBeenCalledWith({fileContent:expect.any(String),destinationPath:options.destinationPath,fileName:options.fileName})
        
    })
    test("should run ServerApp with custom values mocked",()=>{
        const logMock = jest.fn();
        const errorMock = jest.fn();
        const createMock = jest.fn().mockReturnValue('1 x 2 = 2');
        const saveFileMock = jest.fn().mockReturnValue(true);


        global.console.log=logMock;
        global.console.error=errorMock;
        CreateTable.prototype.execute=createMock;
        SaveFile.prototype.execute=saveFileMock;


        ServerApp.run(options);

        expect(logMock).toHaveBeenCalledWith('Server running...');
        expect( createMock).toHaveBeenCalledWith({base:options.base,limit:options.limit});
        expect(saveFileMock).toHaveBeenCalledWith({fileContent:'1 x 2 = 2',destinationPath:options.destinationPath,fileName:options.fileName});
        expect(logMock).toHaveBeenCalledWith('File Created!');
        expect(errorMock).not.toHaveBeenCalled();

    });
})