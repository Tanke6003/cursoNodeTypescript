import { emailTemplate } from '../../src/js-foundation/01-template';

describe("js-fundation/01-template.ts",()=>{

    test("emailTeplate should contain a greeting",()=>{
        expect(emailTemplate).toContain("Hi, ")
    })
    test("emailTemplate should contain {{name}} and {{orderId}}",()=>{
        expect(emailTemplate).toMatch(/{{name}}/);
        expect(emailTemplate).toMatch(/{{orderId}}/);
    })
});