const input = document.querySelectorAll('input');
const edit = document.querySelector('.edit');
const save = document.querySelector('.save');
const select = document.querySelectorAll('option');
const room = document.querySelector('.room-id');
const form = document.querySelector('.card-text');
// disable input fields by default

/*
IMPORTS:
const mongoose = require ('mongoose')
const room = require('../schemas/room')
const user = require('../schemas/user')

FINDING NUMBER OF ROOMS:
var no_of_rooms
room.countDocuments({}, function (err, count){
    if (err) console.log(err)
    else{
        no_of_rooms=count
        console.log(no_of_rooms)
        rand_gen.generator(no_of_rooms)
    }
})

FINDING ROOM BY ID:
this_room = await room.findOne({room_id: room_no})

FINDING USER FROM ROOM:
this_user = await user.findOne({_id: this_room.user_id})

this_room.temperature
*/

input.forEach(ip => {
    ip.disabled= true;
    // ip.setAttribute("disabled","true");
    // console.log(ip.setAttribute(disabled));
});
edit.addEventListener('click',e=>{
    e.preventDefault();
    edit.classList.add('d-none');
    save.classList.remove('d-none');
    input.forEach(ip => {
        ip.disabled=false;
    })
    
})
save.addEventListener('click',e=>{
    e.preventDefault();
    save.classList.add('d-none');
    edit.classList.remove('d-none');
    input.forEach(ip => {
        ip.disabled=true;
        console.log(ip.value);
    })  
})
let options = document.querySelectorAll('option');
let index = 0;
room.addEventListener('click',e=>{
    options.forEach(op=>{
        if(op.selected){
            index = parseInt(op.value);
        }
    })
    if(e.target.classList.contains('bi-chevron-right')){
        options[index].selected = false;
        if(index === options.length -1){
            index = 0;
        }
        index++;
        options[index].selected = true;
    }
    if(e.target.classList.contains('bi-chevron-left')){
        options[index].selected = false;
        if(index === 1){
            index = options.length;
        }
        index--;
        options[index].selected = true;
    }
})
form.addEventListener('click',e=>{
    if(e.target.classList.contains('form-range')){
        let ip = e.target.parentElement.nextElementSibling;
        //console.log(e.target.parentElement.nextElementSibling);
        ip.innerHTML = `${e.target.value}&deg;C`
        //e.target.nextElementSibling.innertHTML = `${e.target.value}&deg;c`;
    }
    
})