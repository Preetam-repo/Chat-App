/* jshint esversion : 8*/ 
//  io function called which invokes an event
var socket = io();

socket.on("connect", () => {
        console.log("Connected To The Server ");

        // as soon as the browser connects to the server
        // socket.emit("createMessage", {
        //      from : "Preetam",
        //      text :  "what's going on!!"
        // });
   });

socket.on("disconnect", () => {
        console.log("Disconnected From The Server!!");
   });

socket.on("newMessage", (newMessage) => {
     console.log(newMessage);
});   