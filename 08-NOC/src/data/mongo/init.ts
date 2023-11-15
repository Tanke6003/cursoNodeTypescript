import Mongoose from "mongoose";

interface ConnectionOptions {
  mongoUrl: string;
  dbName: string;
}
export class MongoDatabases {
  static async connnect(options: ConnectionOptions) {
    const { mongoUrl, dbName } = options;
    try {
      await Mongoose.connect(mongoUrl, {
        dbName: dbName,
      });
      return true;
    } catch (error) {
      throw error;
    }
  }
}
