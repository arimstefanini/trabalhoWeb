import ControllerTable from "./classes/controllers/ControllerTable.js";
import LocalDatabase from "./classes/LocalDatabase.js";

const base = new LocalDatabase();
base.init()

const table = document.querySelector('table').tBodies[0];

const inputNumber = document.querySelector('#number');
inputNumber.addEventListener('input', updateNumber)

const inputFilter = document.querySelector("#filter");
inputFilter.addEventListener('input', updateFilter)

const controller = new ControllerTable(Number(inputNumber.value), base.getBase())
export default controller

refresh()

export function refresh() {
    removeAll()
    addAll(controller.getGuestsPage())
    controller.update()
}

function updateNumber() {
    controller.setNumber(inputNumber.value)
}

function updateFilter() {
    controller.setGuests(base.getBase())
    let subValue = inputFilter.value
    if (subValue !== "") {
        controller.filter(subValue)
    }
}

function remove(index) {
    table.deleteRow(index)
}

function removeAll() {
    while (table.rows.length > 0) {
        remove(0)
    }
}

function add(id, phone, firsName, lastName, email) {
    let row = table.insertRow(table.rows.length);
    row.setAttribute('class', 'line-table ' + ((table.rows.length % 2 === 0) ? 'pair' : 'odd'))

    let cell = row.insertCell(0)
    cell.textContent = id;
    cell.setAttribute('class','cell')

    cell = row.insertCell(1)
    cell.textContent = phone;
    cell.setAttribute('class','cell')

    cell = row.insertCell(2)
    cell.textContent = firsName;
    cell.setAttribute('class','cell')

    cell = row.insertCell(3)
    cell.textContent = lastName;
    cell.setAttribute('class','cell')

    cell = row.insertCell(4)
    cell.textContent = email;
    cell.setAttribute('class','cell')
}

function addAll(guests) {
    for (let i = 0; i < guests.length; i++) {
        add(guests[i].id, guests[i].phone, guests[i].firstName, guests[i].lastName, guests[i].email)
    }
}