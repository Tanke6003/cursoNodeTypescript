import { ServerApp } from "./presentation/server";


describe('Test App',()=>{
    test('should call Server.run with values',async()=>{
        const severRunMock = jest.fn().mockImplementation(()=>{
            console.log('Server running...');
        });
        const logSpy = jest.spyOn(console,'log');
        ServerApp.run = severRunMock;
         
        process.argv = ['node','app.ts','-b','5','-l','10','-s','-n','custom','-d','test'];

        await import('./app');

        expect(severRunMock).toHaveBeenCalledWith({
            base:5,
            limit:10,
            requiredShow:true,
            fileName:'custom',
            destinationPath:'test'
        });
        
        expect(logSpy).toHaveBeenCalledWith('Server running...');
    });
});