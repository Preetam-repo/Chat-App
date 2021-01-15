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

socket.on("newMessage", (newMessage) => {
        let li = document.createElement("li");
        li.innerText = `${newMessage.from} : ${newMessage.text}`;

        document.querySelector("body").appendChild(li);
   });   

//    
   socket.on("newLocationMessage", (newMessage) => {
    let li = document.createElement("li");
    let a = document.createElement("a");
    a.setAttribute('target','_blank');
    a.setAttribute('href',`${newMessage.url}`);
    a.innerText = 'View Location.....';
    li.appendChild(a);
    document.querySelector("body").appendChild(a);
});    
// message sent on button click
document.querySelector('#submit_btn').addEventListener('click',function(event){
     event.preventDefault();
     socket.emit('createMessage',{
         from : "user",
         text : document.querySelector('input[name="message"]').value
     },(msg) => {
    console.log(msg);
   });
});

document.querySelector('#send_location').addEventListener('click',function(){
     
    if(!navigator.geolocation){
        return alert("GeoLocation is not supported By Your Browser!!");
    }

    navigator.geolocation.getCurrentPosition((position) => {
        //    console.log(position);
        socket.emit("createLocationMessage",{
            lat : position.coords.latitude,
            lng : position.coords.longitude
        });
    } , () => {
        alert("Unable To Fetch Location!");
    });
});

// on disconnect
socket.on("disconnect", () => {
    console.log("Disconnected From The Server!!");
});
