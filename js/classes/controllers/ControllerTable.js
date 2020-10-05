import ControllerTableHead from "./ControllerTableHead.js";
import ControllerTableButtons from "./ControllerTableButtons.js";

const info = document.querySelector("#info-table-text")

export default class ControllerTable {

    guests = []
    page = 1
    number = 10
    filtered = false
    original

    controllerButtons = new ControllerTableButtons()
    controllerHead = new ControllerTableHead(this)

    constructor(localDatabase) {
        this.original = localDatabase
        this.rebase()
    }

    filter(subValue) {
        this.rebase()
        this.filtered = subValue !== ''
        if (this.filtered) {
            this.guests = this.guests.filter((guest) => guest.includes(subValue))
        }
        this.controllerHead.reorder()
    }

    orderBy(field, order) {
        this.guests.sort((a, b) => (a.getField(field) > b.getField(field)) ? 1 * order : ((b.getField(field) > a.getField(field)) ? -1 * order : 0))
        this.page = 1
        this.update()
    }

    numberPages() {
        return Math.max(1, Math.ceil(this.guests.length / this.number))
    }

    indexStart() {
        return (this.page - 1) * this.number;
    }

    indexEnd() {
        return Math.min(this.indexStart() + this.number, this.guests.length) - 1;
    }

    update() {
        this.controllerButtons.update(this.page, this.numberPages())
        this.updateInfo(this.indexStart() + 1, this.indexEnd() + 1, this.guests.length, this.filtered, this.original.size())
    }

    getGuestsPage() {
        let regress = []
        let start = this.indexStart()
        let end = this.indexEnd()
        for (let i = start; i <= end; i++) {
            regress[regress.length] = this.guests[i]
        }
        return regress
    }

    rebase() {
        this.guests = this.original.clone()
        this.filtered = false
    }

    updateInfo(start, end, all, asFilter, total){
        info.textContent = 'Showing '+ Math.min(start, end) + ' to ' + end + ' of ' + all + ' entries' + (asFilter ? ' (filtered from '+total+ ' total entries)' : '')
    }

}

