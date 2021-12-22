import navigate from "./helpers/navigate.js";

const API="http://localhost:8080/users/login";



const loginUser=async (email, password) =>{

    const response=await fetch (API,{
        method: "POST",
        headers:{
            "Accept": "application/json",
            "Content-Type":"application/json"
        },
        body: JSON.stringify({
            email, 
            password
        })
    });
    const data=await response.json();
    
    if(data.error){
        throw new Error(data.error);
    }
    else {
        sessionStorage.setItem("token", data.token)
        console.log(data)
        console.log( navigate("accounts"));
   
    }
};

document.forms[0].addEventListener("submit", async (e)=>{
    e.preventDefault();
    
    const email=e.target.elements.email.value;
    const password=e.target.elements.password.value;
    
    const added=await loginUser(email, password);

    return added;
});

