const message = document.querySelector('#message');
console.log(message);
message.addEventListener('submit',e=>{
    console.log(e);
    e.preventDefault();
    console.log(message.contactemail.value,message.messagetext.value);
    alert('Message Sent');
})