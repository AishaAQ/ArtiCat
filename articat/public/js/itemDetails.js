//from local storage cause they cant reach this page without being first the items page which loads from json file
// let items = JSON.parse(localStorage.items);
const urlParameter = new URLSearchParams(window.location.search);
const itemId = urlParameter.get('item');
const itemDetailsCC = document.querySelector('.item-container')
const itemLink = document.querySelector('#item-link')

//when the page loads
document.addEventListener('DOMContentLoaded', handlePageLoad);

async function handlePageLoad() {    
    
    const response1 = await fetch(`api/${localStorage.currentUser}`,{ method: 'GET'})
    const currentUser = await response1.json()
    
    const response2 = await fetch(`api/items/${itemId}`,{ method: 'GET'})
    const item = await response2.json()

    // const users = JSON.parse(localStorage.users)
    // const currentUser = users.find(user => user.username === localStorage.currentUser)
    // const item = items.find(i => i.itemId == itemId)
    
    // console.log("found item:", item);
    const itemDetailsHTML= itemDetailsToHTML(item, currentUser)
    itemDetailsCC.innerHTML = itemDetailsHTML

    itemLink.innerHTML = `<a href="items.html?category=${item.category}">${item.category}</a> > ${item.name}`
    
    const form = document.querySelector('#quantity-form')
    const quantityItem = document.querySelector('#quantity');
    const priceOfItem = document.querySelector('#price');

    form.addEventListener('submit', buyItem)

    quantityItem.addEventListener('input', () => {
        
        const quantity = parseInt(quantityItem.value);
        const price = parseFloat(item.price);
        if(!quantity) {
            priceOfItem.textContent = `${price}` + '$';  
        }
        else{
            const totalPrice = quantity * price;
            priceOfItem.textContent = totalPrice.toFixed(2) + '$';
        }

    });
    
    
};

function buyItem(e) {

    e.preventDefault()

    checkLoggedIn()

}

//displaying the item
function itemDetailsToHTML(item, user){
    if (!item) {
        return `<div class="details">Item details not available.</div>`;}
    return  `
    <div class="item">
    <img src="${item.image}" alt="${item.name}">
    <div class="details">
        <h1 id="price">${item.price}$</h1>
        <h3>${item.name}</h3>
        <p>${item.description}</p>
        <p>${item.seller.companyName}</p>
        <form id="quantity-form">
            <input type="text" id="itemId" name="itemId" hidden>
            <input type="text" id="itemPrice" name="itemPrice" hidden>
            <input type="text" id="user" name="user" hidden>
            <p>Unit Price: ${item.price}$</p>
            <div>
                <label for="quantity">Quantity:</label>
                ${item.quantity <= 0 ? `<p>Out of Stock!</p>` : 
                user && user.type === 'seller' && user.username === item.seller.username ? `<p>${item.quantity}</p>` :
                `<input type="number" id="quantity" name="quantity" min="1" max="${item.quantity}" step="1" value="1">`
                }
            </div>
            ${user && user.type === 'seller' && user.username === item.seller.username ? `<input type="button" value="Update Item" id="update-btn" onclick="updateItem('${item.itemId}')">` :
            `<input type="submit" value="Buy Now" id="buy-btn" class="${item.quantity <=0 ? `hidden` : ``}"></input>` }
        </form>
    </div>`
}


async function checkLoggedIn(){


    const response = await fetch(`api/${localStorage.currentUser}`,{ method: 'GET'})
    const user = await response.json()

    if (!localStorage.currentUser) window.location.href = "signin.html"

    // const users = localStorage.users
    // const user = JSON.parse(users)
    // const foundUser = user.find(u => u.username === localStorage.currentUser)

    if (user.type === 'seller') {
        Swal.fire({
            title: 'Not a Customer!',
            text: 'Please sign in as a customer to buy items.',
            icon: 'warning',
            confirmButtonColor: '#d65f83'
         }).then((result) => {
            if(result.value){
             this.props.submitUser(this.state)
           }
         })
        return
    } 

    // const items = JSON.parse(localStorage.items)
    // const item = items.find(i => i.itemId === itemId)

    const response2 = await fetch(`api/items/${itemId}`,{ method: 'GET'})
    const item = await response2.json()

    const quantityItem = document.querySelector('#quantity').value
    const priceOfItem = item.price
    const totalPrice = quantityItem * priceOfItem


    console.log(quantityItem);

    if(user.customer.moneyBalance < totalPrice){
        
        Swal.fire({
            title: 'Not Enough Balance',
            text: 'Please check your balance and try again.',
            icon: 'warning',
            confirmButtonColor: '#d65f83',
         }).then((result) => {
            if(result.value){
             this.props.submitUser(this.state)
           }
         })
        return
    }

    localStorage.custQuantity = quantityItem
    localStorage.currentItemId = itemId
    window.location.href = "purchasedetails.html"
    

}


function updateItem(itemId){
    window.location.href = `addOrUpdateItem.html?item=${itemId}`}