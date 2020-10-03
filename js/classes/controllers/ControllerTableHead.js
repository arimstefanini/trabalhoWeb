import controller from "../../ControllerGuests.js";

const idUp = document.querySelector("#up-id")
idUp.addEventListener('click', () => orderBy('id', 1, idUp))
const idDown = document.querySelector("#down-id")
idDown.addEventListener('click', () => orderBy('id', -1, idDown))

const phoneUp = document.querySelector("#up-phone")
phoneUp.addEventListener('click', () => orderBy('phone', 1, phoneUp))
const phoneDown = document.querySelector("#down-phone")
phoneDown.addEventListener('click', () => orderBy('phone', -1, phoneDown))

const fNameUp = document.querySelector("#up-fName")
fNameUp.addEventListener('click', () => orderBy('firstName', 1, fNameUp))
const fNameDown = document.querySelector("#down-fName")
fNameDown.addEventListener('click', () => orderBy('firstName', -1, fNameDown))

const lNameUp = document.querySelector("#up-lName")
lNameUp.addEventListener('click', () => orderBy('lastName', 1, lNameUp))
const lNameDown = document.querySelector("#down-lName")
lNameDown.addEventListener('click', () => orderBy('lastName', -1, lNameDown))

const emailUp = document.querySelector("#up-email")
emailUp.addEventListener('click', () => orderBy('email', 1, emailUp))
const emailDown = document.querySelector("#down-email")
emailDown.addEventListener('click', () => orderBy('email', -1, emailDown))

let lassOrder = idUp

export default class ControllerTableHead {

    reorder() {
        updateColor(lassOrder, "#C0C0C0")
        lassOrder.dispatchEvent(new Event('click'))
    }
}

function updateColor(button, color){
    (lassOrder.getAttribute('class').includes('up')) ? lassOrder.style.borderBottomColor = color : lassOrder.style.borderTopColor = color
}

function orderBy(field, order, button) {
    controller.orderBy(field, order)
    updateColor(lassOrder, "#C0C0C0")
    lassOrder = button
    updateColor(button, "#2880FB")

}



