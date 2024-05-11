const urlParameter = new URLSearchParams(window.location.search);
const itemId = urlParameter.get('item');


const form = document.querySelector('#addItem-form')
const cancelBTN = document.querySelector('#cancel-btn')
const submitBTN = document.querySelector('#addItem-btn')
const fileInput = document.querySelector('#image')
const preview = document.querySelector("#preview")
const reader = new FileReader()
let update = false

document.addEventListener('DOMContentLoaded', async () => {
  const itemId = urlParameter.get('item');
  if (itemId) {
    // fetching
    const response = await fetch(`api/items/${urlParameter.get('item')}`, { method: 'GET' })
    const item = await response.json()

    //loading image into the form
    submitBTN.textContent = 'Update Item'
    preview.src = item.image
    preview.classList.remove('hidden')

    //loading data into the form
    update = true
    const response2 = await fetch(`api/items/${urlParameter.get('item')}`, { method: 'GET' })
    const itemold = await response2.json()
    const itemId = document.querySelector('#itemId')
    const name = document.querySelector('#item-name')
    const image = document.querySelector('#image')
    const category = document.querySelector('#Ceramics')
    const price = document.querySelector('#item-price')
    const quantity = document.querySelector('#item-quantity')
    const description = document.querySelector('#item-description')
    const categories = document.querySelectorAll('input[name="category"]')
    itemId.value = itemold.itemId
    price.value = itemold.price
    quantity.value = itemold.quantity
    image.src = itemold.image
    name.value = itemold.name
    description.value = itemold.description
    category.value = itemold.category
    categories.forEach(c => { if (c.value === itemold.category) { c.checked = true } })

  }

})


form.addEventListener('submit', addForm)
async function addForm(e) {
  e.preventDefault()
  let imageFile = document.querySelector('#image')

  //the alert
  if (!imageFile.value && !update) {
    Swal.fire({
      title: 'No Image Uploaded!',
      text: 'Please upload an image for your item',
      icon: 'error',
      confirmButtonText: 'OK',
      confirmButtonColor: '#d65f83'
    }).then((result) => {
      if (result.value) {
        this.props.submitUser(this.state)
      }
    })
  } else {
    console.log("Form submitted")
    e.preventDefault()
    const item = formToObject(e.target)
    console.log(item)
    const sellerusername = localStorage.currentUser
    let add = false

    //adding item
    if (item.itemId == '') {
      parseItem(item)

      delete item.itemId

      const response1 = await fetch(`api/${sellerusername}`, { method: 'GET' })
      user = await response1.json()
      item.sellerUN = String(user.username)
      const image = localStorage.getItem('uploadedImage')
      item.image = String(image)
      const response = await fetch(`api/items`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(item)
      })
      console.log("added yay")
      localStorage.removeItem('uploadedImage')
      add = true
    }

    //updating item since same form is used for add and update
    else {
      //get the item thats being updated using api to take the image from it 
      console.log("here2")
      const response2 = await fetch(`api/items/${itemId}`, { method: 'GET' })
      const itemold = await response2.json()
      item.image = localStorage.getItem('uploadedImage') ? String(localStorage.getItem('uploadedImage')) : itemold.image
      console.log("here1")
      //make sure the type is same as in database
      parseItem(item)
      const response = await fetch(`api/items/${itemold.itemId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)

      })
      console.log("here")
      console.log(item)
      localStorage.removeItem('uploadedImage')
      add = false
    }
    form.reset()
    Swal.fire({
      title: add ? 'Added!' : 'Updated!',
      text: add ? 'Item successfully added' : 'Item successfully updated',
      icon: 'success',
      confirmButtonText: 'OK',
      confirmButtonColor: '#d65f83'
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.href = `items.html?items=myItems`;
      }
    })
  }
}


function formToObject(form) {
  const formData = new FormData(form)
  const data = {}
  for (const [key, value] of formData) {
    data[key] = value
  }
  return data
}

function handleEvent(event) {
  if (event.type === "load") {
    localStorage.setItem('uploadedImage', reader.result); //Store image
    preview.src = reader.result;
    preview.classList.remove('hidden')
  }
}

function addListeners(reader) {
  reader.addEventListener("load", handleEvent);
}

fileInput.addEventListener("change", handleSelected);
function handleSelected(e) {
  const selectedFile = fileInput.files[0];
  if (selectedFile) {
    addListeners(reader);
    reader.readAsDataURL(selectedFile);
  }
}

function parseItem(item) {
  item.name = String(item.name);
  item.category = String(item.category);
  item.price = parseFloat(item.price);
  item.quantity = parseInt(item.quantity);
  item.description = String(item.description);
}

cancelBTN.addEventListener('click', cancelSubmit)
function cancelSubmit() {
  window.history.go(-2); //go back two pages
}  
