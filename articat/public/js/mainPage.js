//get the ref of element we want to interact with
//select more than one element 
const categoriesB = document.querySelectorAll('#Ceramics, #Paintings, #Jewelry');
//add event listener
categoriesB.forEach(c => {
    c.addEventListener('click', handleCategoryClick)})
//the function
function handleCategoryClick(){
    const category = this.id;
    window.location.href = `items.html?category=${category}`;
}

const featuredCC = document.querySelector('#featured-container')
const shopAllBtn = document.querySelector('#shop-btn')

document.addEventListener('DOMContentLoaded', addFeatured);
shopAllBtn.addEventListener('click', handleShopAll)

function handleShopAll() {
  window.location.href = `items.html?category=all`
}

async function addFeatured(){

  const response = await fetch(`api/items?featured=true`,{ method: 'GET'})
  let featuredItems = await response.json()
  const itemsHTML = featuredItems.map(item => itemToHTML(item)).join(' ')
  featuredCC.innerHTML = itemsHTML
}

function itemToHTML(item){
  return `
 
  <div class="item" onclick="handleItemClick('${item.itemId}')">
  <img src="${item.image}" alt="${item.name}">
      <h4>${item.name}</h4>
      <p>$${item.price}</p>
   </div>`
}

async function handleItemClick(itemId){
  window.location.href = `itemdetail.html?item=${itemId}`

            const response3 = await fetch(
              `api/items/${itemId}/click`,
              {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                }
              }
            );
    }


// slide show
let slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;
  let slides = document.querySelectorAll(".mySlides");
  let dots = document.querySelectorAll(".dot");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
}

