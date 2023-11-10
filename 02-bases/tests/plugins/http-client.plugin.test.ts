import { httpClient } from "../../src/plugins";

describe("plugins/http-client.plugin.ts", () => {

    test("httpClientPlugin.get() should return a string", async () => {
        const data = await httpClient.get("https://jsonplaceholder.typicode.com/todos/1");
        expect(data).toEqual({ userId: 1, id: 1, title: 'delectus aut autem', completed: expect.any(Boolean) })
    });
    test("httpClientPlugin should have GET, POST, PUT and DELETE methods", () => {
        expect(typeof httpClient.get).toBe('function')
        expect(typeof httpClient.post).toBe('function')
        expect(typeof httpClient.put).toBe('function')
        expect(typeof httpClient.delete).toBe('function')
    });
})