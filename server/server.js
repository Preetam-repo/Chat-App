/*jshint esversion:8*/ 
const path = require('path');
const http = require('http');
const socket = require('socket.io');
const express = require('express');

const {generateMessage,generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');

const publicPath = path.join(__dirname , "/../public");
const PORT = process.env.PORT || 3000;
const app = express();
let server = http.createServer(app);
// this will give us access to the route "http://localhost:3000/socket.io/socket.io.js"
let io = socket(server);
let users = new Users();


io.on("connection",(socket) => {
   console.log("A New User Is Connected!!");
   console.log("User Id : ",socket.id);
   // custom event calling
// emiting to only one user
// // {Greeting Message to the connected user!}
//    socket.emit("newMessage",generateMessage("Admin","Welcome To The ChatRoom!!"));

// //emiting to all users except me
//    socket.broadcast.emit("newMessage",generateMessage("Admin","A New User Just Joined!!"));

// Joining Room
   socket.on('join',(params, callback) => {
      if(!isRealString(params.name) || !isRealString(params.room)) 
      {
        return callback("Name And Room Are Required!!");//return it so it will not go further if name and room is not correct
      }
      else{
         socket.join(params.room);
         // first we have to check whether a user is in some other room -> alternatively we can simply remove the user from other room
         users.removeUser(socket.id);
         users.addUser(socket.id,params.name,params.room);   
         //we want to emit to everybody inside a particular room including me
         io.to(params.room).emit("updateUserList",users.getUserList(params.room));
         //we want to emit to everybody inside a particular room except me
         socket.to(params.room).emit('newMessage',generateMessage("Admin",`${params.name} has Joined ${params.room} chat room!!`));



         //showing message inside specifi c room 
         // {Greeting Message to the connected user!}
         socket.emit("newMessage",generateMessage("Admin",`Welcome To The ${params.room}!!`));

         //emiting to all users except me
         // socket.broadcast.to(params.room).emit("newMessage",generateMessage("Admin","A New User Just Joined!!"));

         callback();
      }
   });
// custom event listener
   socket.on("createMessage",(message,callback) => {
         
        let user = users.getUser(socket.id);

        if(user && isRealString(message.text))
        {
        //emiting to all users (broadcast to everyone even for myself)
        io.to(user.room).emit("newMessage" , generateMessage(user.name,message.text));
       
        callback("Successfully Received By The Server!!");
        // socket.broadcast.emit("newMessage" , {
        //            from : message.from,
        //            text : message.text,
        //            createdAt : new Date().getTime()
        //        });

       // if (new_msg == 1)  check for room 
       // else => broadcast to the given room 
        }
      });
   
   socket.on("createLocationMessage",(coords) => {
      let user = users.getUser(socket.id);
      if(user)
      {
        io.to(user.room).emit("newLocationMessage",generateLocationMessage(user.name , coords.lat , coords.lng));
      }
    });
   


// when we refresh page it means we are disconnecting 

    socket.on("disconnect",() => {
        //getting user which gets disconnected and updates users array.
        let user = users.removeUser(socket.id);
        if(user){
           io.to(user.room).emit('updateUserList',users.getUserList(user.room));
           io.to(user.room).emit('newMessage',generateMessage("Admin",`${user.name} has left ${user.room} chat room!!`));
        }
        console.log("User Just Disconnected!!");
      });

});

app.use(express.static(publicPath));
server.listen(PORT , () => console.log(`Connected To Server On PORT ${PORT}`));