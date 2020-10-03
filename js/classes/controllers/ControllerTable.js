import ControllerTableHead from "./ControllerTableHead.js";
import ControllerTableInfo from "./ControllerTableInfo.js";
import ControllerTableButtons from "./ControllerTableButtons.js";
import controller from "../../ControllerGuests.js";
import {refresh} from "../../ControllerGuests.js";

export default class ControllerTable {

    guests = []
    page = 0
    number = 10

    controllerButtons = new ControllerTableButtons()
    controllerInfo = new ControllerTableInfo()
    controllerHead = new ControllerTableHead();

    constructor(number, guests) {
        this.number = number
        this.guests = guests
    }

    filter(subValue) {
        this.guests = this.guests.filter((guest) => guest.includes(subValue))
        this.setPage(0)
    }

    getIndexStart() {
        return this.page * this.number
    }

    getIndexEnd() {
        return Math.min(this.getIndexStart() + this.number, this.getNumberGuests()) - 1
    }

    getGuestsPage() {
        let regress = []
        let start = this.getIndexStart()
        let end = this.getIndexEnd()
        for (let i = start; i <= end; i++) {
            regress[regress.length] = this.guests[i]
        }
        return regress
    }

    setGuests(value) {
        this.guests = value
        this.controllerHead.reorder()
        this.setPage(0)
    }

    setNumber(value) {
        this.number = Number(value)
        this.setPage(0)
    }

    getPage = () => this.page;

    setPage(value) {
        let newPg = Number(value)
        if (0 <= newPg && newPg < controller.getNumberPages()) {
            this.page = newPg
            refresh()
        }
    }

    getNumberGuests() {
        return this.guests.length
    }

    getNumberPages() {
        return Math.max(1, Math.ceil(this.getNumberGuests() / this.number))
    }

    asNextPage() {
        return this.page + 1 !== this.getNumberPages()
    }

    isFirstPage() {
        return this.page === 0
    }

    orderBy(field, order) {
        this.guests.sort((a, b) => (a.getField(field) > b.getField(field)) ? 1 * order : ((b.getField(field) > a.getField(field)) ? -1 * order : 0))
        this.setPage(0)
    }

    update() {
        this.controllerButtons.updateButtons()
        this.controllerInfo.update()
    }
}

