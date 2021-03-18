const form = document.querySelector('.user-info');

form.addEventListener('submit',e=>{
    e.preventDefault();
    //console.log(form);
    const fname = form.firstname.value;
    const lname = form.lastname.value;
    const uname = form.uname.value;
    const email = form.email.value;
    const mobno = form.mobno.value;
    const admin = form.admin.value;

    console.log(fname,lname,uname,email,mobno,admin);
    
})