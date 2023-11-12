import  Mongoose from "mongoose";

interface ConnectionOptions{
    mongoUrl: string,
    dbName: string,
}
export class MongoDatabases{

    static async connnect(options: ConnectionOptions){
        const {mongoUrl, dbName} = options;
        try {
            await Mongoose.connect(mongoUrl, {
                dbName: dbName
            });
            console.log('Mongo connected');
        } catch (error) {
            console.error('Mongo connection error', error);
            throw error;
            
        }
    
    }
}