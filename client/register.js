const API="http://localhost:8080/users/register";


const addUser=async (full_name, email, password) =>{

    const response=await fetch (API,{
        method: "POST",
        headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify({
            full_name, 
            email, 
            password
        })
    });
    const data=await response.json();
    if(data.error){
        throw new Error(data.error);
    }
    return data.added;
};

document.forms[0].addEventListener("submit", async (e)=>{
    e.preventDefault();
    console.log(e.target)
    const full_name=e.target.elements.full_name.value;
    const email=e.target.elements.email.value;
    const password=e.target.elements.password.value;
    const password2=e.target.elements.password2.value;

    if(password!==password2){
        alert("Repeated wrong password")
    }
    else{
    console.log(full_name, email, password, password2);

    const added=await addUser(full_name, email, password);
    alert ("New user added")
    location.reload();
    return added;
}
    
});

