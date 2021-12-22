const db="http://localhost:8080/bills";

const formBill=document.getElementsByClassName('addBill')
const button = document.getElementById("add");

const displayBills =  (bills) => {
    const form=document.querySelector('#bills')
    
    bills.forEach(bill => {
        console.log(bill)
        const block=document.createElement("div");
        block.className="container";

        const group=document.createElement("h2");
        group.innerHTML=`GROUP ID ${bill.group_id}`;
        const amount=document.createElement("h3");
        amount.innerHTML=`Amount ${bill.amount}`;
        const description=document.createElement("h4");
        description.innerHTML=`Description ${bill.description}`;


        block.append(group, amount, description)
        form.appendChild(block)
    });
};
//main();*/

const getBillsByID=async ()=>{
    const id=location.search.substring(2);
    const response = await fetch(`${db}/${id}`);
    const bills = await response.json();
    displayBills(bills.bill);
    return bills.bill;
}
getBillsByID();

const getGroupId=async()=>{
    return location.search.substring(2);
}

button.onclick = async (e) => {
    const data = {
        amount: e.target.amount.value,
        description: e.target.description.value,
        group_id: getGroupId(),
      };
      console.log(data)
    try {
        
        const response = await fetch(db, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
              
            },
            body: JSON.stringify(
              data
            ),
        });

        const result = await response.json();

        if (result.error) throw new Error(result.error);

        getBillsByID();
    } catch (error) {}
};
