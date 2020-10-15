const firstName = document.getElementById("firstName")
const lastName = document.getElementById("lastName")
const email = document.getElementById("email")
const phone = document.getElementById("phone")

function submit(){
    localStorage.setItem("asNewGuest", true)
    localStorage.setItem("firstName", firstName.value)
    localStorage.setItem("lastName", lastName.value)
    localStorage.setItem("phone", phone.value)
    localStorage.setItem("email", email.value)
    localStorage.setItem("id", Math.trunc(Math.random() * 50))
    alert("ok")
}

