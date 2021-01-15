/*jshint esversion:8*/ 
const path = require('path');
const http = require('http');
const socket = require('socket.io');
const express = require('express');


const app = express();
const publicPath = path.join(__dirname , "/../public");
let server = http.createServer(app);
// this will give us access to the route "http://localhost:3000/socket.io/socket.io.js"
let io = socket(server);

io.on("connection",(socket) => {
   console.log("A New User Is Connected!!");

// custom event calling
// emiting to only one user
// {Greeting Message to the connected user!}
   socket.emit("newMessage",{ 
        from : "Admin",
        text : "Welcome To The ChatRoom!!",
        createdAt : new Date().getDate()
   });

//emiting to all users except me
   socket.broadcast.emit("newMessage",{ 
    from : "Admin",
    text : "A new User Just Joined!!",
    createdAt : new Date().getDate()
   });

// custom event listener
   socket.on("createMessage",(message) => {
       console.log(message);
       console.log(`Message From : ${message.from}`);
       console.log(`Message To : ${message.text}`);

        //emiting to all users (broadcast to everyone even for myself)
        io.emit("newMessage" , {
               from : message.from,
               text : message.text,
               createdAt : new Date().getTime()
           });
       
        // socket.broadcast.emit("newMessage" , {
        //            from : message.from,
        //            text : message.text,
        //            createdAt : new Date().getTime()
        //        });

       // if (new_msg == 1)  check for room 
       // else => broadcast to the given room 
      });


   
    socket.on("disconnect",() => {
        console.log("User Just Disconnected!!");
      });

});

app.use(express.static(publicPath));

const PORT = process.env.PORT || 3000;
server.listen(PORT , () => console.log(`Connected To Server On PORT ${PORT}`));