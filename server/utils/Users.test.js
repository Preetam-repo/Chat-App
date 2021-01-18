/*jshint esversion : 8*/ 
const expect = require('expect');

//import users class
const {Users} = require('./users');

describe('Users', () => {
     
    let users;
    
    beforeEach(() => {
        users = new Users();
        users.users = [{
             id : "1",
             name : "Preetam",
             room : "first"
        },
        {
            id : "2",
            name : "Satyam",
            room : "second"
       },
       {
        id : "3",
        name : "Preetam",
        room : "third"
       },
       {
        id : "4",
        name : "Shivam",
        room : "first"
       }
    ];
    });

//checking addUser function
    it("should add new users",()=>{
         let users = new Users();
         let user = {
             id : "sjdnls",
             name : "Preetam",
             room : "ABC"
         };
         const ReUser = users.addUser(user.id,user.name,user.room);

         expect(users.users).toEqual([user]);
    });

//checking getUserList function
    it("should return name for room first", () => {
             var userList = users.getUserList("first");
             //we should get array names of user
             expect(userList).toEqual(['Preetam','Shivam']);
    }) ;
    it("should return name for room Second", () => {
        var userList = users.getUserList("second");
        //we should get array names of user
        expect(userList).toEqual(['Satyam']);
    });

//checking getUser function 
    it("should return user object with id = 2" , () =>{
        var user = users.getUser("2");
        expect(user).toEqual({id:"2",name:"Satyam",room:"second"});
    });
    it("should not find userId i.e. id which is not available!" , () =>{
        var user = users.getUser("150");
        expect(user).toBeUndefined();
    });

//checking removeUser function
    it("should remove a user", () => {
        let userId = "3";
           user = users.removeUser(userId);
           expect(user.id).toBe(userId);
           expect(users.users.length).toBe(3);
    });
    it("should not remove a user", () => {
        let userId = "101";
           user = users.removeUser(userId);
           expect(user).toBeUndefined();
           expect(users.users.length).toBe(4);
    });         

});
