import Guest from "./Guest.js";

class LocalDatabase {

    #base = []
    #observer

    add(id, phone, firstName, lastName, email) {
        this.#base.push(new Guest(id, phone, firstName, lastName, email))
        this.#notify()
    }

    addAll = json => json.forEach((element) => this.add(element.id, element.phoneNumber, element.firstName, element.lastName, element.emailAddress))

    size = () => this.#base.length;

    clone() {
        let ret = []
        this.#base.forEach(guest => ret.push(guest.clone()))
        return ret
    }

    #notify = () => (this.#observer !== null) ? this.#observer.update() : {}

    setObserver = observer => this.#observer = observer

}

const localData = new LocalDatabase()
export default localData;

