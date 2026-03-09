
const API_URL="http://localhost.com/api"

export function showPunishment(message) {
    let toast = document.querySelector('.toast-container');
    if (!toast) {
        toast = document.createElement('div');
        toast.className = 'toast-container';
        document.body.appendChild(toast);
    }

    toast.innerHTML = `<span class="warning-icon">♰</span> ${message}`;
    
    void toast.offsetWidth; 
    
    toast.classList.add('active');

    setTimeout(() => {
        toast.classList.remove('active');
    }, 4000);
}

document.getElementById('loginForm').addEventListener('submit', async(e)=>{
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const res = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({email,password})
        });

        if (!res.ok) {
            showPunishment("You are punished. You are not of our group.");
            return;
        }

        const data = await res.json();
        localStorage.setItem("token", data.token);
    } catch (error) {
        showPunishment("The void is silent. Connection failed.");
    }
});



const urlParams=new URLSearchParams(window.location.search);
const inviteToken=urlParams.get('ref');


document.getElementById('registrationForm').addEventListener('submit',async(e)=>{
    e.preventDefault();

    const name=document.getElementById('name').value;
    const email=document.getElementById('email').value;
    const phone=document.getElementById('mobile').value;
    const password=document.getElementById('password').value;
    
    if(!name || !email || !phone || !password){
        showPunishment("fool keep your eye on! You missed some fields")
        return;
    }
    try {
        const payload={
            name,email,phone,password,inviteToken:inviteToken
        };
        
        const res=await fetch(`${API_URL}/register`,{
            method:'POST',
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(payload)
        });

        if(!res.ok){
            showPunishment("Failed to register");
            return;
        }
    } catch (error) {
        showPunishment("The void is silent. Connection failed.");
        console.log(error);
    }
})



