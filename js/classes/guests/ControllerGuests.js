import ModelGuests from "./ModelGuests.js";

const inFilter = document.querySelector("#filter");
const inNumber = document.querySelector('#number');

const ups = document.querySelectorAll('.on')
const downs = document.querySelectorAll('.down')
const order = ['id', 'phone', 'firstName', 'lastName', 'email']

const table = document.querySelector('table').tBodies[0];

const buttons = document.querySelector(".buttons")
const regress = document.querySelector("#regress")
const next = document.querySelector("#next")

const info = document.querySelector("#info-table-text")

export default class ControllerGuests {

    #model

    constructor() {
        this.#model = new ModelGuests(this)

        inFilter.addEventListener('input', () => this.upFilter())
        inNumber.addEventListener('input', () => this.upNumber())

        regress.addEventListener('click', () => this.upPage(this.#model.getPage() - 1))
        next.addEventListener('click', () => this.upPage(this.#model.getPage() + 1))

        for (let i = 0; i < order.length; i++) {
            ups[i].addEventListener('click', () => this.upOrder(order[i], 1))
            downs[i].addEventListener('click', () => this.upOrder(order[i], -1))
        }
    }

    upPage(page) {
        this.#model.setPage(page)
        this.update()
    }

    upFilter() {
        this.#model.rebase()
        this.#model.filter(inFilter.value)
        this.#model.order()
        this.#model.setPage(1)
        this.update()
    }

    upNumber() {
        this.#model.setNumber(Number(inNumber.value))
        this.#model.updatePage()
        this.update()
    }

    upOrder(field, direction) {
        const lastOrder = this.#getOrderButton(this.#model.getOrder(), this.#model.getOrderDirection())
        const newOrder = this.#getOrderButton(field, direction)

        this.#model.setOrder(field)
        this.#model.setOrderDirection(direction)

        this.#sortButtonColor(lastOrder, "#C0C0C0")
        this.#sortButtonColor(newOrder, "#2880FB")

        this.#model.order()
        this.update()
    }

    #getOrderButton = (field, direction) => (direction === 1) ? ups[order.indexOf(field)] : downs[order.indexOf(field)];

    upInfo() {
        info.textContent = 'Showing ' + (Math.min(this.#model.indexStart(), this.#model.indexEnd()) + 1) + ' to ' + (this.#model.indexEnd() + 1) + ' of ' + this.#model.size() + ' entries' +
            (this.#model.getFiltered() ? ' (filtered from ' + this.#model.baseSize() + ' total entries)' : '')
    }

    upButtons() {
        while (buttons.childElementCount > 0) {
            buttons.firstChild.remove()
        }

        const first = this.#model.firstButton()
        const last = this.#model.lastButton()

        for (let i = first; i <= last; i++) {
            buttons.appendChild(this.#createButton(i));
        }

        regress.blur()
        regress.disabled = this.#model.isFirstPage()

        next.blur()
        next.disabled = this.#model.isLastPage()
    }

    upTable() {
        this.#removeGuests()
        this.#addGuests(this.#model.currentGuests())
    }

    update() {
        this.upTable()
        this.upInfo()
        this.upButtons()
    }

    /* head */
    #sortButtonColor = (button, color) => (button.getAttribute('class').includes('on')) ? button.style.borderBottomColor = color : button.style.borderTopColor = color

    /* head */

    /* table  */
    #addGuest(id, phone, firsName, lastName, email) {
        let row = table.insertRow(table.rows.length);
        row.setAttribute('class', 'line-table ' + ((table.rows.length % 2 === 0) ? 'even' : 'odd'))
        const param = [id, phone, firsName, lastName, email]
        for (let i = 0; i < order.length; i++) {
            let cell = row.insertCell(i)
            cell.textContent = param[i];
            cell.setAttribute('class', 'cell')
        }
    }

    #addGuests(guests) {
        guests.forEach((guest) => this.#addGuest(guest.id, guest.phone, guest.firstName, guest.lastName, guest.email))
    }

    #removeGuests() {
        while (table.rows.length > 0) {
            table.deleteRow(0)
        }
    }

    /* table  */

    /*   buttons  */
    #createButton(number) {
        let button = document.createElement('button')
        button.setAttribute('class', 'button button-normal ' + ((number === this.#model.getPage()) ? ' current-page' : ''))
        button.textContent = number
        button.addEventListener('click', () => this.upPage(Number(button.textContent)))
        return button
    }

    /*   buttons  */

}