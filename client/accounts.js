const db="http://localhost:8080/accounts";
const dbBills="http://127.0.0.1:5500/client/billsForGroups.html"

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
            h3.id="viewAccount"
            h3.innerHTML = account.group_id;
           
            h3.onclick=()=>{
                const link=`${dbBills}?=${account.id}`
               window.open(link);
               }

            form.appendChild(h3);
        });
    } catch (error) {
        console.error("Something went wrong");
    }

   // addAccountBtn.onclick = () => navigate("accounts")
};
main();

const button = document.getElementById("add");

button.onclick = async (group_id) => {
    data=document.getElementById("id");
    group_id={groupId: data}
    console.log(group_id)

    try {
        const token = sessionStorage.getItem("token");
  
        const response = await fetch(db, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(
                group_id
            ),
        });

        const data = await response.json();

        if (data.error) throw new Error(data.error);

        await main();

    } catch (error) {
        console.error("Something went wrong");
    }
};


