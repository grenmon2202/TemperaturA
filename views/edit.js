const input = document.querySelectorAll('input');
const edit = document.querySelector('.edit');
const save = document.querySelector('.save');
const select = document.querySelectorAll('option');
const room = document.querySelector('.room-id');
const form = document.querySelector('.card-text');
// disable input fields by default
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