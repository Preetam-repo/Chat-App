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

   socket.on("disconnect",() => {
       console.log("User Just Disconnected!!");
   });

   socket.io("chat_message ",(data) => {
       console.log(`HELLO ${data['type']}`);
       // if (new_msg == 1)  check for room 
       // else => broadcast to the given room 
   });
});

app.use(express.static(publicPath));



const PORT = process.env.PORT || 3000;
server.listen(PORT , () => console.log(`Connected To Server On PORT ${PORT}`));