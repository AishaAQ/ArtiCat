const form = document.querySelector('#signin-form')

form.addEventListener('submit', signIn)

async function signIn(e) {
    
    e.preventDefault()
    const signInData = formToObject(e.target)
    const response = await fetch(`api/${signInData.username}`,{ method: 'GET'})
    const user = await response.json()
    
    if (user && user.password === signInData.password) {
        localStorage.currentUser = user.username
        if (user.type === "admin") window.location.href = "statistics"
        else window.location.href = "mainPage.html"
    } else {
        form.elements['password'].value = ''
        Swal.fire({
            title: 'Try Again!',
            text: 'Incorrect username or password.',
            icon: 'error',
            confirmButtonColor: '#d65f83'
         }).then((result) => {
            if(result.value){
             this.props.submitUser(this.state)
           }
         })
    }
}

// Converting the form data to an object
function formToObject(form) {

    const formData = new FormData(form)
    const data = {}

    // the name in html will become the key
    for (const [key, value] of formData) {
        data[key] = value
    }

    return data

} 