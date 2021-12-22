const db="http://localhost:8080/accounts";

const form=document.querySelector('.accounts')
const input=document.getElementById('.id')

const main = async () => {
    const token = sessionStorage.getItem("token");
    try {
        const response = await fetch(db, {
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

const button = document.getElementById("add");

button.onclick = async () => {
    const group_id=input.value;
    console.log(group_id)
    try {
        const token = sessionStorage.getItem("token");
        console.log(token,db)
        const response = await fetch(db, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                group_id,
            }),
        });

        const data = await response.json();

        if (data.error) throw new Error(data.error);

    } catch (error) {
        console.error("Something went wrong");
    }
};
