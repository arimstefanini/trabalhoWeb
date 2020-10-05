import ControllerTable from "./classes/controllers/ControllerTable.js";
import LocalDatabase from "./classes/LocalDatabase.js";

export {updatePage, nextPage, regressPage}

const table = document.querySelector('table').tBodies[0];

const inputNumber = document.querySelector('#number');
inputNumber.addEventListener('input', updateNumber)

const inputFilter = document.querySelector("#filter");
inputFilter.addEventListener('input', updateFilter)

const localData = new LocalDatabase();
localData.init()
const controller = new ControllerTable(localData)

refresh()

function refresh() {
    removeAll()
    addAll(controller.getGuestsPage())
    controller.update()
}

function updateNumber() {
    controller.number = Number(inputNumber.value)
    controller.page = 1
    refresh()
}

function updateFilter() {
    controller.filter(inputFilter.value)
    controller.page = 1
    refresh()
}

function updatePage(page) {
    controller.page = page
    refresh()
}

function nextPage() {
    updatePage(controller.page + 1)
}

function regressPage() {
    updatePage(controller.page - 1)
}

function removeAll() {
    while (table.rows.length > 0) {
        table.deleteRow(0)
    }
}

function add(id, phone, firsName, lastName, email) {
    let row = table.insertRow(table.rows.length);
    row.setAttribute('class', 'line-table ' + ((table.rows.length % 2 === 0) ? 'pair' : 'odd'))
    let param = [id, phone, firsName, lastName, email]
    for (let i = 0; i < param.length; i++) {
        let cell = row.insertCell(i)
        cell.textContent = param[i];
        cell.setAttribute('class', 'cell')
    }
}

function addAll(guests) {
    guests.forEach((guest) => add(guest.id, guest.phone, guest.firstName, guest.lastName, guest.email))
}