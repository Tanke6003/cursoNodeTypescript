import { ServerApp } from './server'

describe("presentation/server",()=>{


    test("should create ServerApp instance",()=>{
        const serverApp = new ServerApp();
        expect(serverApp).toBeInstanceOf(ServerApp);
        expect( typeof ServerApp.run).toBe('function')
    })

    test("",()=>{
        
    })
})