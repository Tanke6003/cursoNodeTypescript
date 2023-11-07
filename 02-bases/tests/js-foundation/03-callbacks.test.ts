import { get } from "http";
import { getUserById } from "../../src/js-foundation/03-callbacks";

describe("js-foundation/03-callbacks.ts", () => {



  test("getUserById should return an error if user does not exist", (done) => {
    const id = 10;
    getUserById(id, (err, user) => {
      expect(err).toBe(`User not found with id ${id}`);
      expect(user).toBeUndefined();
      done();
    });
  });

  test("getUserById should return an user object with id and name and should be John Doe if does exist",(done)=>{
    const id = 1;
    getUserById(id, (err, user) => {
        expect(err).toBeUndefined();
        expect(user).toHaveProperty('id');
        expect(user).toHaveProperty('name');
        expect(user).toStrictEqual({
            id: 1,
            name: 'John Doe',
          });
        done();
      });
  });



});
