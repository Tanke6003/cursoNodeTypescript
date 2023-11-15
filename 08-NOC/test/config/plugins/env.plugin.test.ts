
import exp from "constants";
import { envs } from "../../../src/config/plugins/env.plugins";

describe("config/plugins/env.plugins", () => {

    test("Should return env variables", () => {
        expect(envs).toEqual({
            PORT: 3000,
            MAILER_EMAIL: 'ruben.farias.1999@gmail.com',
            MAILER_SECRET_KEY: 'hdup rtlg yhdh sxlz',
            PROD: true,
            MAILER_SERVICE: 'gmail',
            MONGO_URL: 'mongodb://tanke6003:123456@localhost:27017',
            MONGO_USER: 'tanke6003',
            MONGO_PASSWORD: '123456',
            MONGO_DB_NAME: 'NOC-test',
            POSTGRES_URL: 'postgresql://tanke6003:123456@localhost:5432/NOC-test',
            POSTGRES_USER: 'tanke6003',
            POSTGRES_PASSWORD: '123456',
            POSTGRES_DB_NAME: 'NOC-test'
          });
        });
    test("Should return error if not found env", async() => {
        jest.resetModules();
        process.env.PORT = 'ABC';
        try {
            await import('../../../src/config/plugins/env.plugins');
            expect(true).toBe(false);
        } catch (error) {
            expect(`${error}`).toContain('"PORT" should be a valid integer');
        }
    });
});