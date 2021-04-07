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
    fetch('http://localhost:3000/dashboard', {method: 'POST', headers: {'Content-Type': 'application/json'}, body: finalChanges})
})

// update value of temperature on dashboard given as input by the user
const range = document.querySelectorAll('.form-range');
const tp = document.querySelector('.tp');
const tn = document.querySelector('.tn');
const tx = document.querySelector('.tx');
const temp = document.querySelector('h2');
// tp tn tx
document.addEventListener('click',e=>{
    console.log('pressed');
    displayroominfo();
    if(e.target.classList.contains('form-range')){
        // let changes = [form.temp.value, form.tempmin.value, form.tempmax.value]
        // let finalChanges = JSON.stringify(changes)
        // console.log(finalChanges)  
        // fetch('http://localhost:3000/dashboard', {method: 'POST', headers: {'Content-Type': 'application/json'}, body: finalChanges})
    }
    
})

const ID = document.getElementById('roomid');

const displayroominfo = () =>{
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
displayroominfo();
changebackground(form.temp.value);