const input = document.querySelectorAll('input');
const edit = document.querySelector('.edit');
const save = document.querySelector('.save');
const roomlist = document.querySelector('.room-id');
const form = document.querySelector('#user');

// disable input by default
input.forEach(ip => {
    ip.disabled= true;
});

//enable input
const enableinput = ()=>{
    input.forEach(ip => {
        if(ip.id === 'roomid'|| ip.id === 'email'){
            ip.disabled = true;
        }
        else{
            ip.disabled = false;
        }
    }); 
};

// lets the user enter data
edit.addEventListener('click',e=>{
    e.preventDefault();
    edit.classList.add('d-none');
    save.classList.remove('d-none');
    enableinput();
})

//gets data entered by the user
save.addEventListener('click',e=>{
    e.preventDefault();
    save.classList.add('d-none');
    edit.classList.remove('d-none');
    let changes = []
    input.forEach(ip => {
        ip.disabled=true;
        changes.push(ip.value)
        console.log(ip.value);
    })
    let finalChanges = JSON.stringify(changes)
    console.log(finalChanges)  
    fetch('http://localhost:3000/admin_dashboard', {method: 'POST', headers: {'Content-Type': 'application/json'}, body: finalChanges})
})

// change to next or previous rooms functionality for admin
let options = document.querySelectorAll('option');
let index = 0;
roomlist.addEventListener('click',e=>{
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
        displayroominfo(index);
    }
    if(e.target.classList.contains('bi-chevron-left')){
        options[index].selected = false;
        if(index === 1 || index === 0){
            index = options.length;
        }
        index--;
        options[index].selected = true;
        displayroominfo(index);
    }
})

// update based on selected option
const select = document.querySelector('select');
select.addEventListener('click',e=>{
    displayroominfo(e.target.value);
})

// update value of temperature on dashboard given as input by the user
const range = document.querySelectorAll('.form-range');
const tp = document.querySelector('.tp');
const tn = document.querySelector('.tn');
const tx = document.querySelector('.tx');
const temp = document.querySelector('h2');
// tp tn tx
document.addEventListener('click',e=>{
    tp.innerHTML = `${form.temp.value}&deg;c`;
    tn.innerHTML = `${form.tempmin.value}&deg;c`;
    tx.innerHTML = `${form.tempmax.value}&deg;c`;
    changebackground(form.temp.value);
})


// getting room data
const room_ids = document.querySelector('.room_id').innerText.split(',');
const room_users = document.querySelector('.room_user').innerText.split(',');
const room_temps = document.querySelector('.room_temp').innerText.split(',');
const thermos = document.querySelector('.thermostat').innerText.split(',');
const max_temps = document.querySelector('.max_temp').innerText.split(',');
const min_temps = document.querySelector('.min_temp').innerText.split(',');
const emails = document.querySelector('.email').innerText.split(',');
const names = document.querySelector('.name').innerText.split(',');
const mobnos = document.querySelector('.mobno').innerText.split(',');
const ID = document.getElementById('roomid');

const displayroominfo = (i)=>{
    form.name.value = names[i-1];
    form.temp.value = thermos[i-1];
    form.tempmin.value = min_temps[i-1];
    form.tempmax.value = max_temps[i-1];
    form.mobno.value = mobnos[i-1];
    form.email.value = emails[i-1];
    ID.value = 'Room No ' + i;
    temp.innerHTML = `${room_temps[i-1]}<span class="align-top" id="unit">&deg;</span>c`;
    tp.innerHTML = `${form.temp.value}&deg;c`;
    tn.innerHTML = `${form.tempmin.value}&deg;c`;
    tx.innerHTML = `${form.tempmax.value}&deg;c`;
    changebackground(form.temp.value);    
}

// render background
const changebackground = (tempv) =>{
    const bg = document.querySelector('body').classList;
    if(tempv<18){
        bg.forEach(b=>{
            bg.remove(b);
        });
        bg.add('templow');
    }
    else if(tempv>32){
        bg.forEach(b=>{
            bg.remove(b);
        });
        bg.add('temphigh');
    }
    else{
        bg.forEach(b=>{
            bg.remove(b);
        });
        bg.add('tempnormal');
    }
}

// values to display when form loads initially
displayroominfo(Math.floor((Math.random() * room_ids.length) + 1));
