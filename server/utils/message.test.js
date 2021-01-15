/*jshint esversion : 8*/ 
let expect = require('expect');

// testing generateMessage function
var {generateMessage,generateLocationMessage} = require('./message');

describe('Generate Message', () => {
    it("should generate correct message object",() => {
        from = "Preetam";
        text = "Some Random text";
        message = generateMessage(from , text);

       expect(typeof message.createdAt).toBe("number");
       expect(message).toMatchObject({from,text}); 
    }); 
});

// testing generateLocationMessage function
describe('Generate Location', () => {
    it("Should Generate Location Object!", () => {
       from = 'User';
       lat = 12;
       lng = 17;
       url = `https://www.google.com/maps?q=${lat}, ${lng}`;
       message = generateLocationMessage(from , lat , lng);

       expect(typeof message.createdAt).toBe("number");
       expect(message).toMatchObject({from , url}); 

    });
});
