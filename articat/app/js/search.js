//select the elements
const searchForm = document.querySelector('#searchForm')
const searchBB = document.querySelector('.search-bar')

//event listener when form is submitted (user press enter)
searchForm.addEventListener('submit', handleFrorm)

//send the value in the url
function handleFrorm(e){
    e.preventDefault();
    const searchValue = encodeURIComponent(searchBB.value) //replace all spaces with nothing
    window.location.href = `items.html?searchValue=${searchValue}`
}