const button = document.getElementById("save")
button.addEventListener("click", submit)

function submit(){
    localStorage.setItem("asNewGuest", true)
    localStorage.setItem("firstName", document.getElementById("firstName").value)
    localStorage.setItem("lastName", document.getElementById("lastName").value)
    localStorage.setItem("phone", document.getElementById("phone").value)
    localStorage.setItem("email", document.getElementById("email").value)
    localStorage.setItem("id", Math.trunc(Math.random() * 50))
}

