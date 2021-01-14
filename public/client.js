//  io function called which invokes an event
var socket = io();

socket.on("connect", () => {
        console.log("Connected To The Server ")
   });

socket.on("disconnect", () => {
        console.log("Disconnected From The Server!!");
   });