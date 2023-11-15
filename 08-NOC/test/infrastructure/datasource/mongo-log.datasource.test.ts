import mongoose from 'mongoose';
import { MongoDatabases } from '../../../src/data/mongo/init';
import { MongoLogDataSource } from '../../../src/infrastructure/datasources/mongo.datasource';
import { LogEntity, LogSeverityLevel } from '../../../src/domain/entities/log.entity';

describe('infrastructure/datasource/mongo-log.datasource.ts', () => {
    beforeAll(async () => {
        await MongoDatabases.connnect({
            dbName:process.env.MONGO_DB_NAME!,
            mongoUrl:process.env.MONGO_URL!
        });
    });
    afterAll( () => {
        mongoose.connection.close();
    });
    test("Should create a log",async()=>{
        const logDataSource = new MongoLogDataSource();

        const log = new LogEntity({
            level:LogSeverityLevel.medium,
            message:'test-message',
            origin:'mongo-log.datasource.test.ts'
        });
        await logDataSource.saveLog(log);
        
    });
});
