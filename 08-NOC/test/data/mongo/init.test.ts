import mongoose from 'mongoose';
import { MongoDatabases } from '../../../src/data/mongo/init';
import * as env from 'env-var';


describe("data/mongo/init.ts", () => {
    afterAll(async() => {
        mongoose.connection.close();
    });
    test("Should conect to mongoDB", async() => {

        const connected = await MongoDatabases.connnect({
            mongoUrl:process.env.MONGO_URL!,
            dbName:process.env.MONGO_DB_NAME!
            
        });
        expect(connected).toBeTruthy();
    });
    test("Should return an error", async() => {
        try {
            const connected = await MongoDatabases.connnect({
                mongoUrl:"mongodb://tanke6003:123456@failHost:27017",
                dbName:process.env.MONGO_DB_NAME!
                
            });
            expect(true).toBeFalsy();
        } catch (error) {
            expect(true).toBeTruthy();
        }
    });

});