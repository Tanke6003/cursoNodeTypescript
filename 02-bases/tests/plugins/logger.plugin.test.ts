import { exceptions } from "winston";
import { buildLogger,logger as wistonLogger} from "../../src/plugins/logger.plugin";
describe("plugins/logger.plugin.ts", () => {

    test("buildLogger should retrun a function logger", () => {
        const looger = buildLogger('test');
        expect( typeof looger.log ).toBe('function');
        expect( typeof looger.error ).toBe('function');
    });
    test("logger.log should log a message",()=>{
        const winstonLoggerMock = jest.spyOn(wistonLogger,'log');
        const message = "test message";
        const service = "test service";
        const logger = buildLogger(service);
        logger.log(message);
        expect(winstonLoggerMock).toHaveBeenCalledWith(
            'info',
            expect.objectContaining( { 
                level:'info',
                message:message,
                service:service
            }),
           
        );
    })
})