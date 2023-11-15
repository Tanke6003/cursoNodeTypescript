import 'dotenv/config';
import * as env from 'env-var';

export const envs = {
    PORT: env.get('PORT').required().asPortNumber(),
    MAILER_EMAIL: env.get('MAILER_EMAIL').required().asEmailString(),
    MAILER_SECRET_KEY: env.get('MAILER_SECRET_KEY').required().asString(),
    PROD: env.get('PROD').required().asBool(),
    MAILER_SERVICE: env.get('MAILER_SERVICE').required().asString(),

    //mongo db
    MONGO_URL: env.get('MONGO_URL').required().asString(),
    MONGO_USER: env.get('MONGO_USER').required().asString(),
    MONGO_PASSWORD: env.get('MONGO_PASSWORD').required().asString(),
    MONGO_DB_NAME: env.get('MONGO_DB_NAME').required().asString(),

    //Postgres
    POSTGRES_URL: env.get('POSTGRES_URL').required().asString(),
    POSTGRES_USER: env.get('POSTGRES_USER').required().asString(),
    POSTGRES_PASSWORD: env.get('POSTGRES_PASSWORD').required().asString(),
    POSTGRES_DB_NAME: env.get('POSTGRES_DB_NAME').required().asString(),

}