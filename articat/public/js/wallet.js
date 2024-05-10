
//find the user using the username stored in current user, form the users json
//get the balance and display 
balanceCC= document.querySelector('#balance')
document.addEventListener('DOMContentLoaded', handlePageLoad)

async function handlePageLoad() {

    const response1 = await fetch(`api/${localStorage.currentUser}`, {
        method: "GET",
      });
      const user = await response1.json();
      
    balanceCC.innerHTML = walletToHTML(user.customer)

}

function walletToHTML(user){
    return  `
    <p>$${user.moneyBalance}</p>       
    `
}