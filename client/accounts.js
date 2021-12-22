const db="http://localhost:8080/accounts";

const form=document.querySelector('.accounts')
console.log(form)
const main = async () => {
    const token = sessionStorage.getItem("token");
    try {
        const response = await fetch("http://localhost:8080/accounts", {
            method: "GET",
            headers: {
                authorization: `Bearer ${token}`,
            },
        });

        const data = await response.json();
        const accounts=data.account
        console.log(accounts)
        accounts.forEach((account) => {
 
            const h3 = document.createElement("h3");
            h3.innerHTML = account.group_id;
           
            form.appendChild(h3);
        });
    } catch (error) {
        console.error("Something went wrong");
    }

   // addAccountBtn.onclick = () => navigate("accounts")
};
main();


