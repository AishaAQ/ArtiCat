
let itemsFile
const urlParameter = new URLSearchParams(window.location.search)
const category = urlParameter.get('category')
const search = decodeURIComponent(urlParameter.get('searchValue'))
const sellerItems = urlParameter.get('items')

const itemsContainer = document.querySelector('#items-container')
const dropdown = document.querySelector('#dropdown-items')
const dropdownList = document.querySelector('#dropdownlist-items')
const title = document.querySelector('#title')

document.addEventListener('DOMContentLoaded', handlePageLoad);
dropdownList.addEventListener('change', showItems)

async function handlePageLoad() {
   
    try {
        let itemsHTML = ''
        const filteredItems = await getInitialFilteredItems()
        
        if (!filteredItems.length) noItemsErrorMsg()
        
        else {
            itemsHTML = filteredItems.map(item => itemToHTML(item)).join(' ')
            itemsContainer.innerHTML = itemsHTML
        }

        
    } catch (error) {
        console.error("Failed to load items:", error);  
    }
}

async function getInitialFilteredItems() {

    let filteredItems = []

    if (sellerItems) {

        title.textContent = "My Items"
        showCategoryDropDown('seller')
        const sellerUN = localStorage.currentUser
        const response = await fetch(`api/${sellerUN}/items`,{ method: 'GET'})
        filteredItems = response.json()

    } else if (category) {

        title.textContent = "Product Catalogue"
        showCategoryDropDown()
        const response = await fetch(`api/items?category=${category}`,{ method: 'GET'})
        filteredItems = await response.json()
        dropdownList.value = category.toLowerCase()
        // /api/items?category=${category}

    } else if (search) {
        title.classList.add('hidden')
        dropdown.classList.add('hidden')
        const response = await fetch(`api/items?searchValue=${search}`, {
            method: 'GET'})
        filteredItems = await response.json()
    }

    return filteredItems
}

function noItemsErrorMsg() {
    title.classList.remove('hidden')
    title.textContent = 'No items found!'
}

function showCategoryDropDown(type) {
    let listHTML = ``

    if (type === 'seller') {
        title.textContent = 'My Items'
        listHTML = `
        <option value="available">Available Items</option>
        <option value="sold-out">Sold Out Items</option>
        `
    } else {
        listHTML = `
        <option value="ceramics">Ceramics</option>
        <option value="jewelry">Jewelry</option>
        <option value="paintings">Paintings</option>
        `
    }

    dropdownList.innerHTML = dropdownList.innerHTML + listHTML
    
}

async function showItems() {

    const filteredItems = await getFilteredItems()

    let itemsHTML = filteredItems.map(item => itemToHTML(item)).join(' ')
    itemsContainer.innerHTML = itemsHTML

}

async function getFilteredItems() {

    let filteredItems = []

    if (dropdownList.value === 'available' || dropdownList.value === 'sold-out') {
        const sellerUN = localStorage.currentUser
        const response = await fetch(`api/${sellerUN}/items?category=${dropdownList.value}`,{ method: 'GET'})
        filteredItems = await response.json()
    } else if (dropdownList.value === 'all' && sellerItems){
        const sellerUN = localStorage.currentUser
        const response = await fetch(`api/${sellerUN}/items`,{ method: 'GET'})
        filteredItems = await response.json()
    } 
    else if (dropdownList.value === 'all') {
        window.location.href = `items.html?category=${dropdownList.value}`
    } else {
        const category = dropdownList.value.charAt(0).toUpperCase() + dropdownList.value.slice(1);
        window.location.href = `items.html?category=${category}`
    }

    return filteredItems
}

function itemToHTML(item){
    return `
    <div class="item" onclick="handleItemClick('${item.itemId}')">
    <img src="${item.image}" alt="${item.name}">
        <h3>${item.name}</h3>
        <p>$${item.price}</p>
    </div>`
}

async function handleItemClick(itemId){
    window.location.href = `itemdetail.html?item=${itemId}`

    console.log("here");


        const response3 = await fetch(
            
          `api/items/${itemId}/click`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              
            }
          }
        );

        if (response3.ok) {
            console.log("Click count incremented successfully");
        } else {
            console.error("Failed to increment click count");
        }
}

