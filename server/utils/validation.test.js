/*jshint esversion:8*/ 
const expect = require('expect');
const {isRealString} = require('./validation');

describe('Is Real String', () => {
     it("should reject non-string values!",() =>{
          let res = isRealString(65);
          expect(res).toBe(false);
     }); 

     it("should reject string with only spaces!",() =>{
        let res = isRealString('    ');
        expect(res).toBe(false);
    }); 

    it("should allow string with non-space characters!",() =>{
        let res = isRealString('    Pro    ');
        expect(res).toBe(true);
    }); 
});
