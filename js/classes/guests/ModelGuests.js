export default class ModelGuests {

    page = 1
    number = 10
    filtered = false
    maxButtons = 5

    fieldOrder = "id"
    direction = 1

    guests = []
    base

    constructor(base) {
        this.base = base
        this.rebase()
    }

    numberPages = () => Math.max(1, Math.ceil(this.size() / this.getNumber()));

    indexStart = () => (this.getPage() - 1) * this.getNumber();

    indexEnd = () => Math.min(this.indexStart() + this.getNumber(), this.size()) - 1;

    filter(subValue) {
        this.setFiltered(subValue !== "")
        this.guests = (this.getFiltered()) ? this.guests.filter((guest) => guest.includes(subValue)) : this.guests;
    }

    order() {
        this.guests.sort((a, b) => a.compare(this.getOrder(), b) * this.getOrderDirection())
    }

    currentGuests() {
        let regress = []
        const start = this.indexStart()
        const end = this.indexEnd()
        for (let i = start; i <= end; i++) {
            regress.push(this.guests[i])
        }
        return regress
    }

    size() {
        return this.guests.length
    }

    baseSize() {
        return this.base.size()
    }

    rebase() {
        this.guests = this.base.clone()
    }

    firstButton() {
        return Math.max(1,
            (this.getPage() + Math.trunc(this.maxButtons / 2) < this.numberPages()) ?
                this.getPage() - Math.trunc(this.maxButtons / 2) :
                this.numberPages() - this.maxButtons + 1)
    }

    lastButton() {
        return Math.min(this.numberPages(), this.firstButton() + this.maxButtons - 1)
    }

    isFirstPage() {
        return this.getPage() === 1
    }

    isLastPage() {
        return this.getPage() === this.numberPages()
    }

    getPage() {
        return this.page
    }

    setPage(page) {
        if(page < 0){
            this.page = 1
        }else if(page > this.numberPages()){
            this.page = this.numberPages()
        }else{
            this.page = page
        }
    }

    updatePage(){
        this.setPage(this.getPage())
    }

    getNumber() {
        return this.number
    }

    setNumber(number) {
        this.number = number
    }

    getOrder() {
        return this.fieldOrder
    }

    setOrder(order) {
        this.fieldOrder = (order === "id" ||
            order === "phone" ||
            order === "firstName" ||
            order === "lastName" ||
            order === "email") ? order : this.fieldOrder
    }

    setOrderDirection(direction) {
        this.direction = (direction === 1 || direction === -1) ? direction : this.direction;
    }

    getOrderDirection() {
        return this.direction
    }

    getFiltered() {
        return this.filtered
    }

    setFiltered(filtered) {
        this.filtered = filtered
    }
}

