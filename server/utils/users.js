/*jshint esversion : 6*/ 
//  [{
//      id : "asdksadsd",
//      name : "Preetam",
//      room : "Node JS"
//  }]

 class Users{
    constructor(){
        this.users = [];//we modify this array by adding and removing user
    }

    //-- There Are Four Methods --//
    // 1) We Have To Add A User EveryTime  //get the id,name,room
    addUser(id,name,room){
          let user = {id,name,room};
          this.users.push(user);
          return user;
    }

    // 2) Get User List By Room ,so that we know who's in the room
     getUserList(room){ 
        //looping throw all users which has same room as given room
        let users = this.users.filter((user) => user.room === room);
        //looping throw users array and only collect name of users
        let namesArray = users.map((user) => user.name);
        return namesArray;
    }

    // 3) Get User By Id
    getUser(id){
        //looping throw all users which has same room as given id
        return this.users.filter((user) => user.id === id)[0]; //returns object of array whose id matches with the passed id.
        }

    // 4) We Have To Remove User So That When They Leave The Chat We have to remove them from chat list.
    removeUser(id){
        let user = this.getUser(id);// this function returns an object of user if it exists and returns undefined if it does not exists.
        
        if(user){
            //we keep on adding elements(objects) to users array whose id is not equal to the id of the user we want to remove. 
            this.users = this.users.filter((user) => user.id !== id);
        }
        return user;//returning remove user details
    }
    
 }

module.exports = {Users};