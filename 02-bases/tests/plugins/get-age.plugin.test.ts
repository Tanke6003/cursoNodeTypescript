import { Mock } from "node:test";
import { getAge } from "../../src/plugins";


describe("plugins/get-age.plugin.ts",()=>{

    test("getAge() should return age of a person",()=>{
            const  birthDate:string = '1999-03-10';
            const age:number = getAge(birthDate);
            expect(typeof age).toBe('number');
    });

    test("getAge should return current age",()=>{
        const  birthDate:string = '1999-03-10';
        const age:number = getAge(birthDate);
        const calculatedAge:number =new Date().getFullYear() - new Date(birthDate).getFullYear();
        expect(age).toBe(calculatedAge)
    });

    test("getAge should return zero years",()=>{
        const spy:jest.SpyInstance = jest.spyOn(Date.prototype,'getFullYear').mockReturnValue(1999);
        const  birthDate:string = '1999-03-10';
        const age:number = getAge(birthDate);
        expect(age).toBe(0);
        expect(spy).toHaveBeenCalledWith();
    });

})