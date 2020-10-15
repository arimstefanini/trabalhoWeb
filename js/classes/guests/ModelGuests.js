import localData from "../LocalDatabase.js";

export default class ModelGuests {

    #page = 1
    #number = 10
    #filtered = false
    #maxButtons = 5

    #fieldOrder = "id"
    #direction = 1

    #guests = []
    #observer

    constructor(oberser) {
        this.#observer = oberser
        localData.setObserver(this)
        this.rebase()
    }

    rebase = () => this.#guests = localData.clone()

    numberPages = () => Math.max(1, Math.ceil(this.size() / this.getNumber()));

    indexStart = () => (this.getPage() - 1) * this.getNumber();

    indexEnd = () => Math.min(this.indexStart() + this.getNumber(), this.size()) - 1;

    firstButton = () => Math.max(1, (this.getPage() + Math.trunc(this.#maxButtons / 2) < this.numberPages()) ?
        this.getPage() - Math.trunc(this.#maxButtons / 2) : this.numberPages() - this.#maxButtons + 1);

    lastButton = () => Math.min(this.numberPages(), this.firstButton() + this.#maxButtons - 1);

    filter(subValue) {
        this.setFiltered(subValue !== "")
        this.#guests = (this.getFiltered()) ? this.#guests.filter((guest) => guest.includes(subValue)) : this.#guests;
    }

    order = () => this.#guests.sort((a, b) => a.compare(this.getOrder(), b) * this.getOrderDirection())

    currentGuests() {
        let regress = []
        const start = this.indexStart()
        const end = this.indexEnd()
        for (let i = start; i <= end; i++) {
            regress.push(this.#guests[i])
        }
        return regress
    }

    #notify = () => this.#observer.update()

    update() {
        this.rebase()
        this.order()
        this.#notify()
    }

    size = () => this.#guests.length;

    baseSize = () => localData.size();

    isFirstPage = () => this.getPage() === 1;

    isLastPage = () => this.getPage() === this.numberPages();

    getPage = () => this.#page;

    setPage = page => this.#page = page < 0 ? 1 : this.#page = page > this.numberPages() ? this.numberPages() : page;

    updatePage = () => this.setPage(this.getPage())

    getNumber = () => this.#number;

    setNumber = number => this.#number = number

    getOrder = () => this.#fieldOrder;

    setOrder = order => this.#fieldOrder =
        order === "id" ||
        order === "phone" ||
        order === "firstName" ||
        order === "lastName" ||
        order === "email" ? order : this.#fieldOrder

    getOrderDirection = () => this.#direction;

    setOrderDirection = direction => this.#direction = (direction === 1 || direction === -1) ? direction : this.#direction;

    getFiltered = () => this.#filtered;

    setFiltered = filtered => this.#filtered = filtered

}

