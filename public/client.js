/* jshint esversion : 8*/
//  io function called which invokes an event
var socket = io();

function scrollToBottom(){
    let messages = document.querySelector('#message').lastElementChild;
    messages.scrollIntoView();
}

socket.on("connect", () => {
   const params = window.location.search.substring(1);
   const Userdata = JSON.parse('{"'+ decodeURI(params).replace(/&/g,'","').replace(/\+/g,'" "').replace(/=/g,'":"') +'"}');
   console.log(Userdata);
   socket.emit('join', Userdata , (err)=>{

     if(err){
        alert(err);
        window.location.href = "/";
     }
     else{
       console.log("Connected!");
     }

   });
        // as soon as the browser connects to the server
        // socket.emit("createMessage", {
        //      from : "Preetam",
        //      text :  "what's going on!!"
        // });
   });

socket.on("newMessage", (newMessage) => {
        const time = moment(newMessage.createdAt).format('LT');
        // let li = document.createElement("li");
        // li.innerText = `${newMessage.from} ${time}: ${newMessage.text}`;
        // document.querySelector("body").appendChild(li);
        const template = document.querySelector('#message-template').innerHTML;
        const html = Mustache.render(template,{
            from : newMessage.from,
            text : newMessage.text,
            createdAt : time
        });  
        const div = document.createElement('div');
        div.innerHTML = html;
        document.querySelector('#message').appendChild(div);
        scrollToBottom();
   });   

//    
   socket.on("newLocationMessage", (newMessage) => {
    const time = moment(newMessage.createdAt).format('LT');
    const template = document.querySelector('#location-message-template').innerHTML;

    const html = Mustache.render(template, {
        from : newMessage.from,
        url : newMessage.url,
        createdAt : time
    });

    const div = document.createElement('div');
    div.innerHTML = html;
    document.querySelector('#message').appendChild(div);
    scrollToBottom();

    // let li = document.createElement("li");
    // let a = document.createElement("a");
    // a.setAttribute('target','_blank');
    // a.setAttribute('href',`${newMessage.url}`);
    // a.innerText = `View Location.....`;
    // li.innerHTML = `${newMessage.from} ${time} : `;
    // li.appendChild(a);
    
    // document.querySelector("body").appendChild(li);
});    
// message sent on button click
document.querySelector('#submit_btn').addEventListener('click',function(event){
     event.preventDefault();
     socket.emit('createMessage',{
         text : document.querySelector('input[name="message"]').value
     },
     (msg) => {
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

//updateUserList
   socket.on("updateUserList",(users)=>{
      ol = document.createElement('ol');

      users.forEach((user)=>{
        li = document.createElement('li');
        li.innerHTML = user;
        ol.appendChild(li); 
      });
      let peoples = document.querySelector('#peoples');
      peoples.innerHTML = "";
      peoples.appendChild(ol);
   });

// on disconnect
socket.on("disconnect", () => {
    console.log("Disconnected From The Server!!");
});
