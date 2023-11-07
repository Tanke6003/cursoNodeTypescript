import { buildMakePerson } from '../../src/js-foundation/05-factory';




describe('js-foundation/05-factory.ts',()=>{
    const getUUID = ()=> '12345';
    const getAge = ()=> 35;

    test("builMakePersona should return a function",()=>{
        const makePerson = buildMakePerson({getUUID,getAge});
        expect( typeof makePerson).toBe('function');

    });

    test('makePerson shoul return a person',()=>{
        const makePerson = buildMakePerson({getUUID,getAge});
        const johnDoe = makePerson({name:'John Doe',birthdate:'1999-03-10'});
        expect(johnDoe).toEqual({ id: '12345', name: 'John Doe', birthdate: '1999-03-10', age: 35 })
    });



})