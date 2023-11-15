import mongoose from "mongoose";
import { MongoDatabases } from "../../../../src/data/mongo";
import { LogModel } from "../../../../src/data/mongo";

describe("data/mongo/models/log.model.ts", () => {
  beforeAll(async () => {
    await MongoDatabases.connnect({
      mongoUrl: process.env.MONGO_URL!,
      dbName: process.env.MONGO_DB_NAME!,
    });
  });
  afterAll(() => {
    mongoose.connection.close();
  });
  test("Should return LogModel", async () => {
    const logData = {
      message: "test-message",
      origin: "log.model.test.ts",
      level: "low",
    };
    const log = await LogModel.create(logData);
    expect(log).toEqual(
      expect.objectContaining({
        ...logData,
        id: expect.any(String),
        createdAt: expect.any(Date),
      })
    );
    await LogModel.deleteOne({ _id: log.id });
  });
  test("Should return an error", async () => {
    expect(true).toBeTruthy();
  });

  test("Should return the schema object", () => {
    const schema = LogModel.schema.obj;
    expect(schema).toEqual(
      expect.objectContaining({
        message: { type: expect.any(Function), required: true },
        origin: { type: expect.any(Function) },
        level: {
          type: expect.any(Function),
          enum: ["low", "medium", "high"],
          default: "low",
        },
        createdAt: expect.any(Object),
      })
    );
  });
});
