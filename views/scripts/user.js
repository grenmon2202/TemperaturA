const input = document.querySelectorAll('input');
const edit = document.querySelector('.edit');
const save = document.querySelector('.save');
const roomlist = document.querySelector('.room-id');
const form = document.querySelector('#user');

// disable input by default
input.forEach(ip => {
    ip.disabled= true;
});

// update value of temperature on dashboard given as input by the user
const range = document.querySelectorAll('.form-range');
const tp = document.querySelector('.tp');
const tn = document.querySelector('.tn');
const tx = document.querySelector('.tx');
const temp = document.querySelector('h2');
// tp tn tx
document.addEventListener('click',e=>{
    displayroominfo();
})

const ID = document.getElementById('roomid');

const displayroominfo = () =>{
    tp.innerHTML = `${form.temp.value}&deg;c`;
    tn.innerHTML = `${form.tempmin.value}&deg;c`;
    tx.innerHTML = `${form.tempmax.value}&deg;c`;
    //temp.innerHTML = `${form.temp.value}<span class="align-top" id="unit">&deg;</span>c`;
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