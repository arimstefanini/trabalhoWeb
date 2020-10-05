import {updatePage, nextPage, regressPage} from "../../ControllerGuests.js";

const buttons = document.querySelector(".buttons")
const regress = document.querySelector("#regress")
const next = document.querySelector("#next")

export default class CTButtons {

    maxButtons = 5

    constructor() {
        regress.addEventListener('click', regressPage)
        next.addEventListener('click', nextPage)
    }

    update(page, numberPages) {
        this.deleteButtons()

        const first = Math.max( 1, (page + Math.trunc(this.maxButtons / 2) < numberPages) ? page - Math.trunc(this.maxButtons / 2) : numberPages - this.maxButtons + 1)
        const lass = Math.min(numberPages, first + this.maxButtons - 1)

        for (let i = first; i <= lass; i++) {
            buttons.appendChild(this.createButton(i, page));
        }

        regress.blur()
        regress.disabled = (page === 1)

        next.blur()
        next.disabled = (page === numberPages)
    }

    deleteButtons() {
        while (buttons.childElementCount > 0) {
            buttons.firstChild.remove()
        }
    }

    createButton(number, page) {
        let button = document.createElement('button')
        button.setAttribute('class', 'button button-normal ' + ((number === page) ? ' current-page' : ''))
        button.textContent = number
        button.addEventListener('click',() => updatePage(Number(button.textContent)))
        return button
    }

}